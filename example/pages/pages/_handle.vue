<template>
  <div class="page">
    <!--
    /****
    /* The <page-content> component maps data from your CMS to Nacelle components.
    /* For information about creating pages, please refer to:
    /*
    /* https://docs.getnacelle.com/nuxt/pages.html#general-pages
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
import PageContent from '~/components/nacelle/PageContent'

export default {
  components: { PageContent },
  mixins: [getPage()],
  data() {
    return {
      handle: null,
      page: null,
      noPageData: false
    }
  }
}
</script>
