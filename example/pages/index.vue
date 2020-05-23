<!--
/****
/* The "Starship Furniture" store will load as default
/* content in the absence of page data supplied by a CMS
/****
-->
<template>
  <div class="page">
    <!-- Default content starts here -->
    <div v-if="this.noPageData">
      <content-hero-banner
        id="hero-banner"
        backgroundImgUrl="https://nacelle-assets.s3-us-west-2.amazonaws.com/hero-banner.jpg"
        backgroundAltTag="Update your new Nacelle Store"
        :title="name"
        ctaText="Shop Now"
        ctaUrl="/shop"
        :ctaHandler="
          () => {
            this.$router.push('/shop')
          }
        "
      />
      <content-side-by-side
        imageUrl="https://nacelle-assets.s3-us-west-2.amazonaws.com/starship1.jpg"
        title="Image With Text"
        copy="Connect Nacelle to your CMS to update content"
        ctaText="Shop Now"
        ctaUrl="/shop"
        backgroundColor="#f2eee8"
        :ctaHandler="
          () => {
            this.$router.push('/shop')
          }
        "
      />
      <content-side-by-side
        imageUrl="https://nacelle-assets.s3-us-west-2.amazonaws.com/starship2.jpg"
        title="Image With Text"
        copy="Connect Nacelle to your CMS to update content"
        ctaText="Shop Now"
        ctaUrl="/shop"
        backgroundColor="#f2eee8"
        :reverseDesktop="true"
        :ctaHandler="
          () => {
            this.$router.push('/shop')
          }
        "
      />
    </div>
    <!-- End of default content -->

    <!--
    /****
    /* The <page-content> component maps data
    /* from your CMS to Nacelle components
    /****
    -->
    <page-content :page="page" :products="products">
      <!--
        /****
        /* Customize your Nacelle content by taking advantage
        /* of named slots. For more details, refer to:
        /*
        /* https://docs.getnacelle.com/nuxt/pages.html#customizing-homepage-content-output
        /*
        /* Begin editing sections by uncommenting the <template> tags below.
        /****
      -->

      <!-- <template v-slot:section="{ section }"> -->

      <!--
        /****
        /* -- Edit Hero Banner --
        /* |   Available slots:  |
        /* name: "background", data: "backgroundImgUrl", "mobileBackgroundImgUrl", "backgroundAltTag"
        /* name: "body", data: "title", "subtitle", "textColor"
        /* name: "cta", data: "ctaUrl", "ctaText", "ctaHandler"
        /****

        <content-hero-banner
          v-if="section.contentType === 'ContentHeroBanner'"
          v-bind="section.data"
        >
          <template v-slot:body="{ title }">
             <h1 class="special-title">{{ title }}</h1>
          </template>
        </content-hero-banner>
      -->

      <!--
        /****
        /* -- Edit Side-by-Side Section --
        /* |       Available slots:       |
        /* name: "body", data: "title", "copy"
        /* name: "cta", data: "ctaUrl", "ctaText", "ctaHandler"
        /****

        <content-side-by-side
          v-if="section.contentType === 'ContentSideBySide'"
          v-bind="section.data"
        />
      -->

      <!--
        /****
        /* -- Edit Product Grid --
        /* |   Available slots:  |
        /* name: "header", data: "title"
        /* name: "products", data: "products", "columns"
        /****

        <content-product-grid
          v-if="section.contentType === 'ContentProductGrid'"
          v-bind="section.data"
        />
      -->

      <!--
        /****
        /* -- Edit Testimonials --
        /****

        <content-testimonials
          v-if="section.contentType === 'ContentTestimonials'"
          v-bind="section.data"
        />
      -->

      <!-- </template> -->
    </page-content>
  </div>
</template>

<script>
import getPage from '~/mixins/getPage'
import getCollection from '~/mixins/getCollection'
import ContentHeroBanner from '~/components/nacelle/ContentHeroBanner'
import ContentSideBySide from '~/components/nacelle/ContentSideBySide'
import PageContent from '~/components/nacelle/PageContent'
export default {
  components: { ContentHeroBanner, ContentSideBySide, PageContent },
  computed: {
    name() {
      return this.$store.state.space.name
    }
  },
  mixins: [
    getPage({ pageHandle: 'homepage' }),
    getCollection({ pageHandle: 'homepage' })
  ]
}
</script>
