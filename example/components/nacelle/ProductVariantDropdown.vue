<template>
  <div class="variant-dropdown nacelle">
    <div v-if="!hideDropdown" class="select">
      <select
        v-bind="selectedVariant"
        @change="$emit('variant-selected', { selectedVariant })"
      >
        <option :selected="typeof selectedVariant === undefined">
          Choose a {{attributeName}}
        </option>

        <option
          v-for="variant in product.variants"
          :key="variant.id"
          :value="variant"
          :hidden="!variant.availableForSale"
          :disabled="!variant.availableForSale"
          :selected="selectedVariant && selectedVariant.id === variant.id"
        >
          {{ variant.title }}
        </option>
      </select>
    </div>
    <div v-if="showAddToCart && selectedVariant" class="columns is-mobile">
      <div class="column is-half">
        <quantity-selector
          :quantity.sync="quantity"
        />
      </div>
      <div class="column is-half">
        <product-add-to-cart-button
          :product="product"
          :variant="selectedVariant"
          :allOptionsSelected="true"
          :onlyOneOption="true"
          :quantity="quantity"
        >
          <slot name="add-to-cart-button" />
        </product-add-to-cart-button>
      </div>
    </div>
  </div>
</template>

<script>
import QuantitySelector from '~/components/nacelle/QuantitySelector'
import ProductAddToCartButton from '~/components/nacelle/ProductAddToCartButton'

export default {
  components: {
    QuantitySelector,
    ProductAddToCartButton
  },
  props: {
    attributeName: {
      type: String,
      default: 'size'
    },
    product: {
      type: Object,
      default: () => {
        return {
          id: '',
          handle: '',
          title: '',
          variants: [],
          price: {},
          media: [],
          featuredMedia: {}
        }
      }
    },
    variant: {
      type: Object,
      default: () => {
        return {
          id: '',
          title: '',
          handle: '',
          price: '0.00',
          availableForSale: false
        }
      }
    },
    showAddToCart: {
      type: Boolean,
      default: true
    },
    hideForSingleVariant: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedVariant: undefined,
      quantity: 0
    }
  },
  computed: {
    productHasVariants () {
      return (
        this.product &&
        this.product.variants &&
        this.product.variants.length > 0
      )
    },
    hideDropdown () {
      return (
        this.hideForSingleVariant &&
        this.productHasVariants &&
        this.product.variants.length === 1
      )
    }
  },
  created () {
    if (this.variant && this.variant.availableForSale === true) {
      this.selectedVariant = this.variant
    } else if (this.productHasVariants) {
      this.selectedVariant = this.product.variants.find(variant => {
        return variant.availableForSale === true
      })
    }
  }
}
</script>

<style lang="scss">
.variant-dropdown .select,
.variant-dropdown select {
  width: 100%;
}

.variant-dropdown .select {
  margin-bottom: 1rem;
}

.variant-dropdown /deep/ .button {
  width: 100%;
}
</style>
