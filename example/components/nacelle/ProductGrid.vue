<template>
  <div class="product-grid columns is-multiline is-paddingless nacelle">
    <div v-for="product in products" :key="product.id" class="card-wrapper" :class="columnClasses">
      <product-card
        :product="product"
        :showQuantityUpdate="showQuantityUpdate"
        :showAddToCart="showAddToCart"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/nacelle/ProductCard'

export default {
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    },
    showQuantityUpdate: {
      type: Boolean,
      default: true
    },
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    columnClasses() {
      let classes = 'column'

      if (this.columns === 4) {
        classes = `${classes} is-one-quarter-desktop`
      }

      if (this.columns === 3) {
        classes = `${classes} is-one-third-desktop`
      }

      if (this.columns === 2) {
        classes = `${classes} is-half-desktop`
      }

      classes = `${classes} is-half-tablet`

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  padding-bottom: 3rem;
}
</style>
