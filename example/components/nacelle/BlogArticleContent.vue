<template>
  <div class="article-body">
    <slot name="content" :content="content">
      <div class="content" v-html="content" ref="content" />
    </slot>

    <slot></slot>

    <client-only>
      <product-shop-look
        v-for="(shopImage, index) in shopImages"
        :key="index"
        :imageSrc="shopImage.src"
        :products="shopImage.products"
        :buttonText="shopLookButtonText"
        @ready="node => moveImage(shopImage.node, node)"
      >
        <template v-slot:product-card="{ product }">
          <slot name="product-card" :product="product" />
        </template>
      </product-shop-look>
    </client-only>
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import ClientOnly from 'vue-client-only'
import ProductShopLook from '~/components/nacelle/ProductShopLook'

export default {
  components: {
    ClientOnly,
    ProductShopLook
  },
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    customContentToHtml: {
      type: Boolean,
      default: false
    },
    contentToHtmlFn: {
      type: Function,
      default: () => {}
    },
    shopLookButtonText: {
      type: String,
      default: 'Shop the look'
    }
  },
  data() {
    return {
      shopImages: []
    }
  },
  computed: {
    content() {
      if (this.article && this.article.source === 'contentful') {
        return this.contentHtml(this.article.fields.content)
      }

      if (this.article.content) {
        return this.article.content
      }

      return ''
    },
    contentHtml() {
      if (this.customContentToHtml) {
        return this.contentToHtmlFn
      }

      return this.defaultContentToHtml
    },
    hasProducts() {
      return this.products && this.products.length > 0
    }
  },
  watch: {
    content(newVal, oldVal) {
      this.$nextTick(() => {
        this.updateImages()
      })
    },
    products(newVal, oldVal) {
      this.$nextTick(() => {
        this.updateImages()
      })
    }
  },
  mounted() {
    if (this.content.includes('<img')) {
      this.$nextTick(() => {
        this.updateImages()
      })
    }
  },
  methods: {
    defaultContentToHtml(content) {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: node => {
            if (node.data.target.fields && node.data.target.fields.file) {
              return `
                <img
                  class="post-image"
                  src="${node.data.target.fields.file.url}"
                  alt="${node.data.target.fields.title}"
                />
              `
            }

            return ''
          }
        }
      }

      return documentToHtmlString(content, options)
    },
    updateImages() {
      this.shopImages = []
      const images = [...this.$el.querySelectorAll('.article-body img')]

      images.forEach(image => {
        const handles = image.alt.split(',')
        const products = this.products.filter(({ handle }) =>
          handles.includes(handle)
        )

        if (products.length > 0) {
          this.shopImages.push({
            node: image,
            src: image.src,
            products: products
          })
        }
      })
    },
    moveImage(imageNode, shopLookNode) {
      imageNode.parentNode.insertBefore(shopLookNode, imageNode)
      imageNode.style.display = 'none'
    }
  }
}
</script>

<style></style>
