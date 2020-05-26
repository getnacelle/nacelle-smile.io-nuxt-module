<template>
  <div class="columns is-marginless is-mobile flyout-cart-item">
    <router-link
      :to="`${pathFragment}${item.handle}`"
      class="column is-3"
      @click.native="hideCart"
    >
      <product-image
        v-if="productThumbnail && productThumbnail.length > 0"
        :source="productThumbnail"
        :alt="item.title"
      />
    </router-link>

    <div class="column is-9">
      <router-link
        :to="`${pathFragment}${item.handle}`"
        @click.native="hideCart"
      >
        <product-title
          class="flyout-item-title"
          element="h4"
          :title="item.title"
        />
      </router-link>
      <product-variant-title
        :title="variant.title"
        class="flyout-item-variant-title"
      />
      <div class="flyout-item-details columns is-marginless is-paddingless">
        <product-price class="flyout-item-price" :price="item.variant.price" />
        <quantity-selector :item="item" :quantity="item.quantity" />
        <cart-flyout-item-remove-button :lineId="item.variant.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ProductImage from '~/components/nacelle/ProductImage'
import ProductTitle from '~/components/nacelle/ProductTitle'
import ProductPrice from '~/components/nacelle/ProductPrice'
import ProductVariantTitle from '~/components/nacelle/ProductVariantTitle'
import QuantitySelector from '~/components/nacelle/QuantitySelector'
import CartFlyoutItemRemoveButton from '~/components/nacelle/CartFlyoutItemRemoveButton'
export default {
  components: {
    ProductImage,
    ProductTitle,
    ProductPrice,
    ProductVariantTitle,
    QuantitySelector,
    CartFlyoutItemRemoveButton
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
    productThumbnail() {
      if (this.item && this.item.image && this.item.image.thumbnailSrc) {
        return this.item.image.thumbnailSrc
      }

      return ''
    },
    variant() {
      const defaultVariant = {
        id: '',
        title: '',
        price: 0
      }

      if (this.item && this.item.variant) {
        return {
          ...defaultVariant,
          ...this.item.variant
        }
      }

      return defaultVariant
    }
  },
  methods: {
    ...mapMutations('cart', ['hideCart'])
  }
}
</script>

<style lang="scss" scoped>
.flyout-cart-item {
  padding: 1rem;
}
.flyout-item-title {
  font-size: 16pt;
  margin-bottom: 0.7rem;
}
.flyout-item-variant-title {
  margin-bottom: 0.5rem;
}
.flyout-item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flyout-item-price {
  margin-bottom: 0;
}
</style>
