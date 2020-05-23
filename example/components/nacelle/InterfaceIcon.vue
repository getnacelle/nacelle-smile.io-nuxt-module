<template>
  <div class="interface-icon nacelle">
    <router-link v-if="path" :to="path">
      <img class="icon" :src="iconSrc" />
    </router-link>
    <img class="icon" v-else :src="iconSrc" @click="handleIconMethod" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconMethod: {
      type: String
    },
    iconMethodType: {
      type: String
    },
    path: {
      type: String
    },
    customIcon: {
      type: String
    }
  },
  computed: {
    iconSrc() {
      switch (this.iconName) {
        case 'wishlist':
          return 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-wishlist-icon.svg'
          break
        case 'cart':
          return 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-cart-icon.svg'
          break
        case 'account':
          return 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-account-icon.svg'
      }
    }
  },
  methods: {
    handleIconMethod() {
      if (this.iconMethod) {
        if (this.iconMethodType == 'mutation') {
          this.$store.commit(this.iconMethod)
        } else if (this.iconMethodType == 'action') {
          this.$store.commit(this.iconMethod)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
