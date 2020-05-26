<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        v-if="searchResults && searchResults.length == 0"
        key="no-results"
        class="no-results"
      >
        <slot name="no-results"></slot>
      </div>
      <div key="results" class="search-results" v-else>
        <h2>
          Showing {{ searchResults.length }} {{ itemSinglularPlural }} based on
          selected filters
        </h2>
        <slot name="result" :result="searchResultsSlice"></slot>
        <div ref="load-more"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    searchKeys: {
      type: Array,
      default: () => {
        return ['title']
      }
    },
    searchData: {
      type: Array
    },
    searchQuery: {
      type: Object
    },
    relevanceThreshold: {
      type: Number,
      default: 0.5
    }
  },
  watch: {
    filteredData(newData, oldData) {
      if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
        this.resetResults()
      }
    }
  },
  data() {
    return {
      searchRes: null,
      pageHeight: null
    }
  },
  computed: {
    ...mapState('search', ['resultsToDisplay', 'filteredData']),
    itemSinglularPlural() {
      if (this.searchResults && this.searchResults.length === 1) {
        return 'item'
      } else if (this.searchResults && this.searchResults.length > 1) {
        return 'items'
      } else {
        return 'items'
      }
    },
    searchResults() {
      if (
        this.searchData &&
        this.searchQuery &&
        this.searchQuery.value &&
        String(this.searchQuery.value) !== ''
      ) {
        const options = {
          keys: this.searchKeys,
          threshold: this.relevanceThreshold
        }
        const results = new Fuse(this.searchData, options)
          .search(String(this.searchQuery.value))
          .map(result => result.item)

        this.$emit('results')

        return results
      }

      this.$emit('no-query')

      return this.searchData
    },
    searchResultsSlice() {
      return this.searchResults.slice(0, this.resultsToDisplay)
    }
  },
  methods: {
    ...mapMutations('search', ['showMoreResults', 'resetResults'])
  },
  mounted() {
    setTimeout(() => {
      if (this.$refs['load-more']) {
        const options = {
          root: null,
          rootMargin: '250px',
          threshold: 1
        }
        const observer = new IntersectionObserver(this.showMoreResults, options)
        const observee = this.$refs['load-more']

        observer.observe(observee)
        this.isObserverInitialized = true
      }
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.search-results,
.no-results {
  min-height: 400px;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
