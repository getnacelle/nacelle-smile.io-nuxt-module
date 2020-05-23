<template>
  <div>
    <interface-modal :modal-open="showModal" @closeModal="showModal = false">
      {{ error }}
    </interface-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InterfaceModal from '~/components/nacelle/InterfaceModal'
export default {
  components: {
    InterfaceModal
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState('cart', ['error'])
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      const { type, payload } = mutation

      if (type === 'cart/setCartError') {
        this.showModal = true
      }
    })
  }
}
</script>

<style></style>
