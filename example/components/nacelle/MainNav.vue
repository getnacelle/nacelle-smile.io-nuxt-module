<template>
  <div class="main-nav nacelle" role="navigation" aria-label="main navigation">
    <div class="main-nav-left">
      <main-nav-burger />
    </div>
    
    <div class="main-nav-brand">
      <slot name="brand">
        <router-link to="/">
          <img :src="logoSrc" :width="logoWidth" :alt="logoAlt">
        </router-link>
      </slot>
    </div>

    <div class="main-nav-right">
      <div class="main-nav-menu">
        <slot name="menu">
          <!-- menu items -->
        </slot>
      </div>
      <main-nav-cart />
    </div>
  </div>
</template>

<script>
import MainNavBurger from '~/components/nacelle/MainNavBurger'
import MainNavCart from '~/components/nacelle/MainNavCart'

export default {
  components: {
    MainNavBurger,
    MainNavCart
  },
  props: {
    logoSrc: {
      type: String,
      default: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
    },
    logoWidth: {
      type: Number,
      default: 112
    },
    logoAlt: {
      type: String,
      default: ''
    },
    menu: {
      type: Array
    },
  }
}
</script>

<style lang="scss" scoped>
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid #d3d3d3;
}

.main-nav-left,
.main-nav-right {
  display: flex;
  align-items: center;
}

.main-nav-left {
  justify-content: flex-start;

  @media only screen and (min-width: 769px) {
    display: none;
  }
}

.main-nav-right {
  justify-content: flex-end;
}

.main-nav-menu {
  @media only screen and (max-width: 768px) {
    display: none;
  }
}

.main-nav-item {
  padding: 1rem;
}

.main-nav-brand {
  img {
    display: block;
  }
}
</style>

