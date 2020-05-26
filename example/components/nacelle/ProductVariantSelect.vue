<template>
  <div class="variant-select nacelle">
    <product-options
      v-show="showProductOptions"
      :options="allOptions"
      :variant="selectedVariant"
      v-on:selectedOptionsSet="setSelected"
      :variants="product.variants"
      v-on:clear="selectedOptions = []"
    />
    <slot name="above-button"></slot>
    <div class="columns is-mobile">
      <div v-if="displayQuantitySelect" class="column auto">
        <quantity-selector :quantity.sync="quantity" />
      </div>
      <div class="column auto">
        <product-add-to-cart-button
          :quantity="quantity"
          :product="product"
          :variant="selectedVariant"
          :allOptionsSelected="allOptionsSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductOptions from '~/components/nacelle/ProductOptions'
import QuantitySelector from '~/components/nacelle/QuantitySelector'
import ProductAddToCartButton from '~/components/nacelle/ProductAddToCartButton'
import allOptionsSelected from '~/mixins/allOptionsSelected'
import availableOptions from '~/mixins/availableOptions'

export default {
  props: {
    product: {
      type: Object
    },
    variant: {
      type: Object
    },
    showQuantitySelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      quantity: 0
    }
  },
  mixins: [allOptionsSelected, availableOptions],
  components: {
    ProductOptions,
    QuantitySelector,
    ProductAddToCartButton
  },
  computed: {
    showProductOptions() {
      return (
        Array.isArray(this.allOptions) &&
        this.allOptions.length >= 1 &&
        this.allOptions[0].values.length > 1 &&
        this.product.availableForSale
      )
    },
    displayQuantitySelect() {
      return (
        this.allOptionsSelected &&
        this.selectedVariant &&
        this.selectedVariant.availableForSale &&
        this.showQuantitySelect
      )
    }
  }
}
</script>

<style></style>
