<template>
  <div class="search" :class="`${position}-searchbox`">
    <search-input
      :placeholderText="placeholderText"
      :position="position"
      @focus.native="getData"
      @keydown.enter.native="navigateToSearchResults"
    />
    <button
      v-if="position == 'global'"
      class="button"
      @click="navigateToSearchResults"
    >
      Search
    </button>
    <search-autocomplete v-if="position == 'global'"/>
  </div>
</template>

<script>
import SearchInput from '~/components/nacelle/SearchInput'
import SearchAutocomplete from '~/components/nacelle/SearchAutocomplete'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    SearchInput,
    SearchAutocomplete
  },
  props: {
    position: {
      type: String,
      default: 'global'
    },
    searchCategory: {
      type: String,
      default: 'product'
    },
    placeholderText: {
      type: String,
      default: 'Search products..'
    }
  },
  computed: {
    ...mapState('search', ['query'])
  },
  methods: {
    ...mapMutations('menu', ['disableMenu']),
    ...mapActions('search', ['getProductData']),
    getData() {
      if (this.searchCategory === 'product') {
        this.getProductData()
      }
    },
    navigateToSearchResults() {
      const queryVal = this.query && this.query.value ? this.query.value : ''

      this.disableMenu()

      if (this.position == 'global') {
        this.$router.push({ path: '/search', query: { q: queryVal } })
      } else {
        this.$router.push({query: { q: queryVal } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: relative;
}
.global-searchbox input,
.global-searchbox button {
  margin-right: 0.5rem;
}
</style>