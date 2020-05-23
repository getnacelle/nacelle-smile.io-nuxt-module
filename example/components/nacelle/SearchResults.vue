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
        <slot name="result" :result="searchResults"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Fuse from 'fuse.js'

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
  data() {
    return {
      searchRes: null
    }
  },
  computed: {
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
        const results = new Fuse(this.searchData, options).search(
          String(this.searchQuery.value)
        )

        this.$emit('results')

        return results
          .filter(result => typeof result.item !== 'undefined')
          .map(result => result.item)
      }

      this.$emit('no-query')

      return this.searchData
    }
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
