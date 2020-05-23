<template>
  <div class="page-content nacelle">
    <slot :page="page">
      <div v-for="section in mappedSections" :key="section.id">
        <slot name="section" :section="section">
          <component
            v-if="section.contentType"
            :is="section.contentType"
            :id="section.handle"
            v-bind="section.data"
          />
        </slot>
      </div>
    </slot>
    <slot name="body" :body="body">
      <div class="page-content-body section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-8 content" v-html="body" />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import ContentHeroBanner from '~/components/nacelle/ContentHeroBanner'
import ContentSideBySide from '~/components/nacelle/ContentSideBySide'
import ContentTestimonials from '~/components/nacelle/ContentTestimonials'
import ContentTestimonial from '~/components/nacelle/ContentTestimonial'
import ContentProductGrid from '~/components/nacelle/ContentProductGrid'

export default {
  components: {
    ContentHeroBanner,
    ContentSideBySide,
    ContentTestimonials,
    ContentTestimonial,
    ContentProductGrid
  },
  props: {
    page: {
      type: Object,
      default: () => ({
        source: '',
        sections: []
      })
    },
    products: {
      type: Array,
      default: () => []
    },
    customContentToHtml: {
      type: Boolean,
      default: false
    },
    contentToHtmlFn: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    contentToHtml () {
      if (this.customContentToHtml) {
        return this.contentToHtmlFn
      }

      return this.defaultContentToHtml
    },
    mappedSections () {
      if (this.page && this.page.sections && this.page.sections.length > 0) {
        const { source, sections } = this.page
        if (source === 'contentful') {
          return sections.map(this.mapContentfulSection)
        }

        if (source === 'shopify') {
          return this.reduceShopifySections(sections).map(
            this.mapShopifySection
          )
        }

        return sections
      }

      return []
    },
    body () {
      if (this.page) {
        const { source } = this.page

        if (source === 'shopify' && this.page.content) {
          return this.page.content
        }

        if (
          source === 'contentful' &&
          this.page.fields &&
          this.page.fields.body
        ) {
          return this.contentToHtml(this.page.fields.body)
        }
      }

      return ''
    }
  },
  methods: {
    defaultContentToHtml (content) {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: node => `
            <img class="post-image" src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />
          `
        }
      }

      return documentToHtmlString(content, options)
    },
    reduceShopifySections (sections) {
      return sections.reduce((sections, section, index) => {
        if (index > 0 && section.tags.includes('childSection')) {
          const parent = sections[sections.length - 1]
          const child = this.mapShopifySection(section)

          if (parent.children) {
            parent.children.push(child)
          } else {
            parent.children = [child]
          }
        } else {
          sections.push(section)
        }

        return sections
      }, [])
    },
    mapShopifySection (section) {
      const { title, handle, contentHtml, contentType, ...fields } = section
      const clickHandler = () => {
        this.$router.push(fields.ctaUrl)
      }
      let data = {}

      if (contentType === 'ContentHeroBanner') {
        const {
          ctaText,
          ctaUrl,
          image,
          size,
          alignment,
          mobileFullHeight,
          textColor,
          mobileBackgroundImgUrl,
          backgroundAltTag
        } = section

        data = {
          title,
          subtitle: contentHtml || '',
          ctaText,
          ctaUrl,
          ctaHandler: clickHandler,
          backgroundImgUrl: image ? image.originalSrc : '',
          size,
          alignment,
          mobileFullHeight: mobileFullHeight === 'true',
          textColor,
          mobileBackgroundImgUrl,
          backgroundAltTag
        }
      } else if (contentType === 'ContentSideBySide') {
        const {
          ctaText,
          ctaUrl,
          image,
          backgroundColor,
          reverseDesktop,
          reverseMobile
        } = section

        data = {
          title,
          copy: contentHtml,
          ctaText,
          ctaUrl,
          ctaHandler: clickHandler,
          backgroundColor,
          imageUrl: image ? image.originalSrc : '',
          reverseDesktop: reverseDesktop === 'true',
          reverseMobile: reverseMobile === 'true'
        }
      } else if (contentType === 'ContentTestimonials') {
        const { slidesPerView, alignment } = section
        let slides = []

        if (section.children) {
          slides = section.children.map(child => {
            return {
              name: child.data.title,
              quote: child.data.contentHtml,
              imageUrl: child.data.image
                ? child.data.image.originalSrc
                : undefined
            }
          })
        }

        data = {
          title,
          slides,
          slidesPerView: slidesPerView || 1,
          alignment
        }
      } else if (contentType === 'ContentProductGrid') {
        const { columns } = section

        data = {
          title,
          products: this.products,
          columns: columns || 4
        }
      } else {
        data = {
          title,
          handle,
          contentHtml,
          ...fields
        }
      }

      return {
        handle,
        contentType,
        data
      }
    },
    mapContentfulSection (section) {
      const { fields } = section
      const { contentType, handle, title, content, featuredMedia } = fields
      const contentHtml = content ? this.contentToHtml(content) : ''
      const imageSrc =
        featuredMedia && featuredMedia.fields
          ? featuredMedia.fields.file.url
          : ''
      let data = {}

      if (fields) {
        if (fields.contentType === 'ContentHeroBanner') {
          const {
            subtitle,
            ctaUrl,
            ctaText,
            size,
            alignment,
            mobileFullHeight,
            textColor,
            mobileBackgroundImage,
            backgroundAltTag
          } = fields
          const clickHandler = () => {
            this.$router.push(fields.ctaUrl)
          }

          data = {
            title,
            subtitle,
            ctaText,
            ctaUrl,
            ctaHandler: clickHandler,
            backgroundImgUrl: imageSrc,
            size,
            alignment,
            mobileFullHeight: String(mobileFullHeight) === 'true',
            textColor,
            mobileBackgroundImgUrl: mobileBackgroundImage
              ? mobileBackgroundImage.fields.file.url
              : '',
            backgroundAltTag
          }
        } else if (fields.contentType === 'ContentSideBySide') {
          const {
            ctaText,
            ctaUrl,
            backgroundColor,
            reverseDesktop,
            reverseMobile
          } = fields
          const clickHandler = () => {
            this.$router.push(fields.ctaUrl)
          }

          data = {
            title,
            copy: contentHtml,
            ctaText,
            ctaUrl,
            ctaHandler: clickHandler,
            backgroundColor,
            imageUrl: imageSrc,
            reverseDesktop: String(reverseDesktop) === 'true',
            reverseMobile: String(reverseMobile) === 'true'
          }
        } else if (fields.contentType === 'ContentTestimonials') {
          const { slidesPerView, alignment } = fields
          let slides = []

          if (fields.slides) {
            slides = fields.slides.map(child => {
              return {
                name: child.fields.name,
                quote: child.fields.quotation,
                imageUrl: child.fields.featuredMedia
                  ? child.fields.featuredMedia.fields.file.url
                  : undefined
              }
            })
          }

          data = {
            title,
            slides,
            slidesPerView: slidesPerView || 1,
            alignment
          }
        } else if (fields.contentType === 'ContentProductGrid') {
          const { columns } = fields

          data = {
            title,
            products: this.products,
            columns: parseInt(columns, 10) || 4
          }
        } else {
          data = {
            ...fields,
            contentHtml
          }
        }
      }

      return {
        handle,
        contentType,
        data
      }
    }
  }
}
</script>

<style></style>
