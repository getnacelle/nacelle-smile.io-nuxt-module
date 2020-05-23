<template>
  <transition name="slide">
    <div class="nav-flyout nacelle" v-if="menuVisible">
      <div class="nav-flyout-header">
        <slot name="brand">
          <router-link class="navbar-item" to="/">
            <img :src="logoSrc" :width="logoWidth">
          </router-link>
        </slot>
        <button
          class="nav-flyout-close"
          @click="toggleShowMenu"
        >
          <slot name="close">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon" role="img" viewBox="0 0 320 512">
              <path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/>
            </svg>
          </slot>
          <span class="is-sr-only">
            Close
          </span>
        </button>
      </div>
      <div class="nav-flyout-body">
        <slot name="flyout-menu">
          <!-- menu items -->
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    logoSrc: {
      type: String,
      default: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
    },
    logoWidth: {
      type: Number,
      default: 112
    },
    menu: {
      type: Array
    },
  },
  computed: {
    ...mapState('menu', ['menuVisible'])
  },
  methods: {
    ...mapMutations('menu', ['toggleShowMenu'])
  }
}
</script>

<style lang="scss" scoped>
.nav-flyout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 28rem;
  background-color: #ffffff;
  border-left: 1px solid #dedede7a;
  box-shadow: 20px 0px 20px 20px #e6e6e6c4;
  z-index: 999;

  @media screen and (max-width: 768px) {
    width: 100%
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.32s ease;
}

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-28rem);
}

.nav-flyout-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-bottom: 1px solid #d3d3d3;
}

.nav-flyout-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.nav-flyout-body {
  flex-grow: 1;
  padding: 1rem;
  overflow: scroll;
}
</style>

