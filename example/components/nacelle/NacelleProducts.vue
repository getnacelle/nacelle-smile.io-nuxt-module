<template>
  <div class="nacelle product-data-load">
    <slot
      v-if="product && products.length > 0"
      :product="product"
      :products="products"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  props: {
    handle: {
      type: String,
      default: ''
    },
    handles: {
      type: Array,
      default: () => {
        return []
      }
    },
    locale: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      products: []
    }
  },
  computed: {
    product() {
      if (this.products.length > 0) {
        return this.products[0]
      }

      return undefined
    },
    singleProduct() {
      if (this.handle.length > 0 && this.handles.length === 0) {
        return true
      }

      return false
    },
    useLocale() {
      if (this.locale && this.locale !== '') {
        return this.locale
      }

      if (this.$nacelle && this.$nacelle.locale) {
        return this.$nacelle.locale
      }

      return 'en-us'
    }
  },
  created() {
    if (process.browser || process.client) {
      let handlesArr = []

      if (this.singleProduct) {
        handlesArr.push(this.handle)
      } else {
        handlesArr = this.handles
      }

      this.$nacelle.data
        .products({
          handles: handlesArr,
          locale: this.useLocale
        })
        .then(result => {
          if (result && result.length > 0) {
            // filter out non-existant products
            this.products = result.filter(product => {
              return product && product.id && product.handle && product.title
            })
            if (this.product) {
              this.setProduct(this.product)
              this.productView(this.product)
            }
          }
        })
    }
  },
  methods: {
    ...mapMutations('product', ['setProduct']),
    ...mapActions('events', ['productView'])
  }
}
</script>

<style></style>
