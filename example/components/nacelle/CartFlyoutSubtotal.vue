<template>
  <div class="subtotal nacelle" v-if="cartSubtotal">
    <slot :subtotal="cartSubtotal">
      <component :is="titleTag" class="subtotal-title">
        <span>Subtotal:</span>
        <product-price :price="cartSubtotal" />
      </component>
    </slot>
  </div>
</template>

<script>
import ProductPrice from '~/components/nacelle/ProductPrice'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProductPrice
  },
  props: {
    titleTag: {
      type: String,
      default: 'h4'
    }
  },
  computed: {
    ...mapGetters('cart', ['cartSubtotal'])
  }
}
</script>

<style lang='scss' scoped>
.subtotal {
  border-top: 1px solid #dedede;
  padding: 1.5rem 0;
}

.subtotal-title {
  font-size: 14pt;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  color: #616161;
  
  span:first-child {
    margin-right: 0.5rem;
  }
}
</style>
