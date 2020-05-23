<template>
  <div class="nacelle collection-data-load">
    <slot v-if="collection" :collection="collection" :products="products" />
    <button v-if="showButton" @click="fetchProducts" class="nacelle button">{{ buttonText }}</button>
    <observe-emitter v-else v-on:observe="fetchProducts" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ObserveEmitter from '~/components/nacelle/ObserveEmitter'

export default {
  components: {
    ObserveEmitter
  },
  props: {
    handle: {
      type: String,
      default: ''
    },
    locale: {
      type: String,
      default: ''
    },
    paginate: {
      type: Boolean,
      default: false
    },
    productsPerPage: {
      type: Number,
      default: 30
    },
    selectedList: {
      type: String,
      default: 'default'
    },
    useButtonLoadMore: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Load More'
    }
  },
  data() {
    return {
      collection: undefined,
      products: [],
      productIndex: 0,
      isLoadingProducts: false,
      isObserverInitialized: false
    }
  },
  computed: {
    ...mapGetters('collections', ['getCollection']),
    showButton() {
      if (
        this.useButtonLoadMore &&
        this.collection &&
        this.productIndex < this.selectedProductList.length
      ) {
        return true
      }

      return false
    },
    useLocale() {
      if (this.locale && this.locale !== '') {
        return this.locale
      }

      if (this.$nacelle && this.$nacelle.locale) {
        return this.$nacelle.locale
      }

      return 'en-us'
    },
    selectedProductList() {
      if (this.collection && Array.isArray(this.collection.productLists)) {
        const list = this.collection.productLists.find(collection => {
          return collection.slug === this.selectedList
        })

        if (list && Array.isArray(list.handles)) {
          return list.handles
        }
      }

      return []
    }
  },
  created() {
    if (process.browser || process.client) {
      const storeCollection = this.getCollection(this.handle)

      if (storeCollection) {
        this.collection = storeCollection.collection
        this.products = storeCollection.products
      } else {
        this.$nacelle.data
          .collection({
            handle: this.handle,
            locale: this.useLocale
          })
          .then(result => {
            if (result) {
              this.collection = result
              this.products = []
              this.addCollection({
                handle: this.handle,
                collection: this.collection,
                products: this.products,
                productIndex: 0
              })
              this.fetchProducts()
            }
          })
      }
    }
  },
  methods: {
    ...mapMutations('collections', ['addCollection', 'updateCollection']),
    fetchProducts() {
      if (
        !this.isLoadingProducts &&
        (process.browser || process.client) &&
        this.collection &&
        this.products.length < this.selectedProductList.length
      ) {
        this.isLoadingProducts = true

        this.$nacelle.data
          .collectionPage({
            collection: this.collection,
            list: this.selectedList,
            paginate: this.paginate,
            index: this.productIndex,
            itemsPerPage: this.productsPerPage
          })
          .then(result => {
            if (result && result.length > 0) {
              this.products = [...this.products, ...result]
              this.productIndex = this.products.length
              this.updateCollection({
                handle: this.handle,
                collection: this.collection,
                products: this.products,
                productIndex: this.productIndex
              })
              this.isLoadingProducts = false
            }
          })
      }
    }
  }
}
</script>

<style></style>
