<!--
/****
/* For information about search & filtering, please refer to:
/*
/* https://docs.getnacelle.com/nuxt/filtering-products.html#filtering-searching
/****
-->
<template>
  <div>
    <section class="section search-section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <search-box position="in-page" />
          </div>
        </div>
      </div>
    </section>
    <section class="section filtering">
      <div class="column is-12">
        <refinement-filters
          v-if="productData"
          :propertyFilters="[
            { field: 'productType', label: 'Product Type' },
            { field: 'color', label: 'Color' },
            { field: 'material', label: 'Material' },
            { field: 'size', label: 'Size' }
          ]"
          :priceRangeFilters="[
            { range: [0, 50], label: '< $50' },
            { range: [50, 100], label: '$50 - 100' },
            { range: [100, 200], label: '$100 - 200' },
            { range: [200, 500], label: '$200 - 500' },
            { range: [500, 0], label: '> $500' }
          ]"
          :inputData="productData"
          v-on:updated="updateFilteredData"
        />
      </div>
    </section>
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <refinement-results
            v-if="filteredData"
            :searchData="filteredData"
            :searchQuery="query"
          >
            <template v-slot:result="{ result }">
              <product-grid :products="result" :columns="4" />
            </template>
            <template v-slot:no-results>
              <search-no-results />
            </template>
          </refinement-results>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import SearchBox from '~/components/nacelle/SearchBox'
import RefinementFilters from '~/components/nacelle/RefinementFilters'
import RefinementResults from '~/components/nacelle/RefinementResults'
import ProductGrid from '~/components/nacelle/ProductGrid'
import SearchNoResults from '~/components/nacelle/SearchNoResults'

export default {
  components: {
    SearchBox,
    RefinementFilters,
    RefinementResults,
    ProductGrid,
    SearchNoResults
  },
  computed: {
    ...mapState('search', ['query', 'loadedData', 'filteredData']),
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
      if (!this.filteredData) {
        this.getProductData()
      }
    }
  },
  methods: {
    ...mapMutations('search', ['setFilteredData']),
    ...mapMutations('search', ['setQuery']),
    ...mapActions('search', ['getProductData']),
    updateFilteredData(data) {
      this.setFilteredData(data)
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.filtering {
  background: whitesmoke;
  padding: 1rem;
}
</style>
