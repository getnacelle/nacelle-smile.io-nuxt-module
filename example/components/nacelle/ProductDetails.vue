<template>
  <div class="product columns">
    <div class="column is-6">
      <product-media-select-view
        v-if="product && product.featuredMedia && product.media"
        :featuredMedia="product.featuredMedia"
        :media="product.media"
      />
    </div>
    <div class="column is-5 is-offset-1">
      <product-title :title="product.title" />
      <!-- <product-add-to-cart-button
        :product="product"
        :variant="currentVariant"
        :allOptionsSelected="true"
        :onlyOneOption="true"
        :metafields="[{key:'test', value:'hi'}]"
      />-->
      <product-category
        v-if="product.productType"
        :category="product.productType"
      />
      <p class="price">
        <product-price v-if="currentVariant" :price="currentVariant.price"  />
      </p>
      <product-description :description="product.description" />
      <product-variant-select
        v-if="currentVariant"
        :product="product"
        :variant="currentVariant"
        v-on:variant-selected="onVariantSelected"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import ProductCategory from '~/components/nacelle/ProductCategory'
import ProductMediaSelectView from '~/components/nacelle/ProductMediaSelectView'
import ProductTitle from '~/components/nacelle/ProductTitle'
import ProductPrice from '~/components/nacelle/ProductPrice'
import ProductDescription from '~/components/nacelle/ProductDescription'
import ProductVariantSelect from '~/components/nacelle/ProductVariantSelect'
export default {
  components: {
ProductCategory,
ProductMediaSelectView,
ProductTitle,
ProductPrice,
ProductDescription,
ProductVariantSelect
  },
  data () {
    return {
      selectedVariant: undefined
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    currentVariant () {
      if (this.selectedVariant) {
        return this.selectedVariant
      } else if (
        this.product &&
        this.product.variants &&
        this.product.variants.length
      ) {
        return this.product.variants[0]
      }

      return undefined
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart']),
    onVariantSelected ({ selectedVariant }) {
      this.selectedVariant = selectedVariant
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}
</style>
