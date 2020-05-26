<!--
/****
/* The <page-content> component maps data from your CMS to Nacelle components.
/* For information about creating pages, please refer to:
/*
/* https://docs.getnacelle.com/nuxt/pages.html#general-pages
/****
-->
<template>
  <div class="page page-shop">
    <page-content :page="page" :products="products" />
    <section class="section">
      <div class="container">
        <product-grid
          :products="products"
          :showAddToCart="true"
          :showQuantityUpdate="true"
        />
      </div>
      <observe-emitter v-on:observe="fetchMore" />
    </section>
  </div>
</template>

<script>
import getPage from '~/mixins/getPage'
import getCollection from '~/mixins/getCollection'
import PageContent from '~/components/nacelle/PageContent'
import ProductGrid from '~/components/nacelle/ProductGrid'
import ObserveEmitter from '~/components/nacelle/ObserveEmitter'

export default {
  components: {
    PageContent,
    ProductGrid,
    ObserveEmitter
  },
  mixins: [
    getPage({ pageHandle: 'shop' }),
    getCollection({ pageHandle: 'shop' })
  ]
}
</script>
<style lang="scss" scoped>
.product {
  .title {
    font-weight: bold;
  }
  img {
    width: 250px;
  }
}
</style>
