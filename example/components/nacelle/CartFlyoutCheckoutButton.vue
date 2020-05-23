<template>
  <div
    class="button is-primary checkout-button nacelle"
    :class="{ 'is-loading': loading }"
    @click="checkout"
  >
    {{ checkoutText }}
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    checkoutText: {
      type: String,
      default: 'Checkout'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('cart', ['checkoutLineItems', 'checkoutIdForBackend'])
  },
  methods: {
    ...mapMutations('cart', ['setCartError']),
    ...mapActions('cart', ['processCheckout']),
    async checkout() {
      const vm = this
      this.loading = true
      const processCheckoutObject = await this.$nacelle.checkout
        .process({
          cartItems: vm.checkoutLineItems,
          checkoutId: vm.checkoutIdForBackend
        })
        .then(data => {
          if (data && data.id && data.url) {
            return data
          }

          throw new Error('checkout failure')
        })
        .catch(err => {
          console.log(err)
          vm.setCartError(err)
          vm.loading = false
        })
      this.processCheckout(processCheckoutObject)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-button {
  border-radius: 0;
  width: 100%;
  padding: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12pt;
  letter-spacing: 1px;
}
</style>
