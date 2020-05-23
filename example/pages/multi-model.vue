<template>
  <div>
    <section class="section">
      <div class="columns is-multiline">
        /** * Product results show up here */
        <div class="column is-12">
          <search-results
            v-if="productData"
            :searchData="productData"
            :searchQuery="query"
          >
            <template v-slot:result="{ result }">
              <product-grid :products="result" :columns="4" />
            </template>
            <template v-slot:no-results>
              <search-no-results />
            </template>
          </search-results>
        </div>
        /** * Blog results show up here */
        <div class="column is-6">
          <search-results
            v-if="blogData"
            :searchData="blogData"
            :searchQuery="query"
          >
            <template v-slot:result="{ result }">{{ result }}</template>
            <template v-slot:no-results>
              <search-no-results />
            </template>
          </search-results>
        </div>
        <div class="column is-6">
          /** * Event results show up here */
        </div>
        <div class="column is-12">
          /** * Page results show up here */
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import SearchBox from '~/components/nacelle/SearchBox'
import RefinementFilters from '~/components/nacelle/RefinementFilters'
import SearchResults from '~/components/nacelle/SearchResults'
import ProductGrid from '~/components/nacelle/ProductGrid'
import SearchNoResults from '~/components/nacelle/SearchNoResults'
export default {
  components: {
    SearchBox,
    RefinementFilters,
    SearchResults,
    ProductGrid,
    SearchNoResults
  },
  data() {
    return {
      filteredData: null
    }
  },
  computed: {
    ...mapState('search', ['query', 'loadedData']),
    ...mapGetters('search', ['productData'])
  },
  watch: {
    loadedData(newVal) {
      if (newVal) {
        if (this.$route.query && this.$route.query.q) {
          this.setQuery({
            origin: 'in-page',
            value: this.$route.query.q
          })
        }
      }
    }
  },
  created() {
    if (process.browser) {
      this.getProductData()
    }
  },
  methods: {
    ...mapMutations('search', ['setQuery']),
    ...mapActions('search', ['getProductData']),
    updateFilteredData(data) {
      this.filteredData = data
    }
  }
}
</script>

<style>
.search-section {
  background: whitesmoke;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.filtering {
  background: whitesmoke;
  padding: 1rem;
}
</style>
