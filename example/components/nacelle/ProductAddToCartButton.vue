<template>
  <div>
    <button
      v-if="isProductVariantSelectChild"
      :disabled="disableAtcButton"
      @click="addToCart"
      class="add-to-cart-button button is-primary nacelle"
    >
      <span
        v-if="
          !variantInLineItems && !allOptionsSelected && product.availableForSale
        "
        >Select Options</span
      >
      <span
        v-if="
          (!variantInLineItems && allOptionsSelected && variant == undefined) ||
            (!variantInLineItems &&
              allOptionsSelected &&
              variant.availableForSale === false) ||
            !product.availableForSale
        "
        >Out of Stock</span
      >
      <span
        v-if="
          !variantInLineItems &&
            allOptionsSelected &&
            variant &&
            variant.availableForSale == true
        "
        >Add to Cart</span
      >
      <span v-if="variantInLineItems">Added!</span>
    </button>
    <button
      class="button is-primary"
      @click="addToCart"
      v-else
      :disabled="disableAtcButton"
    >
      <slot>
        <span v-if="!onlyOneOption && product.availableForSale"
          >Select Options</span
        >
        <span
          v-if="
            onlyOneOption &&
              !variantInLineItems &&
              variant.availableForSale == true
          "
          >Add to Cart</span
        >
        <span
          v-if="
            (!variantInLineItems &&
              allOptionsSelected &&
              variant == undefined) ||
              (!variantInLineItems &&
                allOptionsSelected &&
                variant.availableForSale === false) ||
              !product.availableForSale
          "
          >Out of Stock</span
        >
        <span v-if="onlyOneOption && variantInLineItems">Added!</span>
      </slot>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object
    },
    variant: {
      type: Object
    },
    metafields: {
      type: Array,
      default: () => {
        return []
      }
    },

    quantity: { type: Number, default: 1 },
    allOptionsSelected: { type: Boolean, default: false },
    confirmedSelection: { type: Boolean, default: false },
    onlyOneOption: { type: Boolean, default: false }
  },

  computed: {
    ...mapState('cart', ['lineItems']),
    ...mapGetters('cart', ['checkoutLineItems']),

    variantInLineItems() {
      const vm = this
      if (vm.variant != null) {
        const lineItem = vm.lineItems.findIndex(lineItem => {
          return lineItem.variant.id === vm.variant.id
        })
        if (lineItem !== -1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    isProductVariantSelectChild() {
      return this.$parent.$options._componentTag === 'product-variant-select'
    },

    disableAtcButton() {
      return (
        !this.allOptionsSelected ||
        (this.allOptionsSelected && this.variant === undefined) ||
        (!this.variantInLineItems &&
          this.allOptionsSelected &&
          this.variant.availableForSale !== true)
      )
    }
  },

  watch: {
    confirmedSelection() {
      this.addToCart()
    }
  },

  methods: {
    ...mapActions('cart', [
      'addLineItem',
      'removeLineItem',
      'incrementLineItem',
      'decrementLineItem',
      'getLineItems'
    ]),
    ...mapMutations('cart', ['showCart']),
    addToCart() {
      if (this.allOptionsSelected && this.product.availableForSale) {
        const lineItem = {
          image: this.product.featuredMedia,
          title: this.product.title,
          variant: this.variant,
          quantity: this.quantity || 1,
          productId: this.product.id,
          handle: this.product.handle,
          vendor: this.product.vendor,
          tags: this.product.tags,
          metafields: this.metafields
        }
        this.addLineItem(lineItem)
        this.showCart()
      }
    }
  }
}
</script>
