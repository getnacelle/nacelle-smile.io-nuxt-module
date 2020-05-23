<template>
  <div class="brand-header nacelle">
    <div v-if="logoAlign == 'left'" class="columns is-marginless is-paddingless">
      <div class="column" :class="logoColumnWidth">
        <interface-logo :src="logoSrc" />
      </div>
      <div class="column is-offset-1 auto links">
        <router-link v-for="link in links" :key="link.path" :to="link.path">{{link.title}}</router-link>
      </div>
      <div class="column auto icons">
        <interface-icon
          v-for="icon in icons"
          :key="icon.iconName"
          :iconName="icon.iconName"
          :iconMethod="icon.iconMethod"
          :path="icon.path"
          :iconMethodType="icon.iconMethodType"
        />
      </div>
    </div>

    <div v-if="logoAlign == 'center'" class="columns is-marginless is-paddingless">
      <div class="column is-5 links">
        <router-link v-for="link in links" :key="link" :to="link.path">{{link.title}}</router-link>
      </div>
      <div class="column is-2">
        <interface-logo :src="logoSrc" />
      </div>
    </div>
  </div>
</template>

<script>
import InterfaceLogo from '~/components/nacelle/InterfaceLogo'
import InterfaceIcon from '~/components/nacelle/InterfaceIcon'
export default {
  components: {
    InterfaceLogo,
    InterfaceIcon
  },
  props: {
    links: {
      type: Array
    },
    logoSrc: {
      type: String
    },
    logoAlign: {
      type: String
    },
    logoColumnWidth: {
      type: String
    },
    icons: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  :nth-child(n) {
    margin-right: 3rem;
  }
  :last-child {
    margin-right: 0;
  }
}
.icons {
  display: flex;
  justify-content: flex-end;
}
</style>
