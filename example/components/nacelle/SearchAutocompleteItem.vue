<template>
  <router-link :to="`${pathFragment}${item.handle}`">
    <div class="columns is-marginless is-mobile autocomplete-item nacelle is-vcentered">
      <product-image 
        v-if="productThumbnail && productThumbnail.length > 0"
        :source="item.featuredMedia.thumbnailSrc"
        :alt="item.title"
      />
      <h3 class="column is-5">{{item.title}}</h3>
      <product-price class="column is-3 is-marginless" :price="productPrice" />
    </div>
  </router-link>
</template>

<script>
import ProductImage from '~/components/nacelle/ProductImage'
import ProductPrice from '~/components/nacelle/ProductPrice'

export default {
  components: {
    ProductImage,
    ProductPrice
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    pathFragment: {
      type: String,
      default: '/products/'
    }
  },
  computed: {
    productThumbnail () {
      if (
        this.item &&
        this.item.featuredMedia &&
        this.item.featuredMedia.thumbnailSrc
      ) {
        return this.item.featuredMedia.thumbnailSrc
      }

      return ''
    },
    productPrice () {
      if (
        this.item &&
        this.item.variants &&
        this.item.variants.length > 0 &&
        this.item.variants[0] &&
        this.item.variants[0].price
      ) {
        return this.item.variants[0].price
      }

      return 0
    }
  }
}
</script>
