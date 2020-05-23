import { mapMutations } from 'vuex'

export default ({ pageHandle, itemsPerPage, selectedList, locale } = {}) => {
  return {
    data() {
      return {
        handle: null,
        collection: null,
        noCollectionData: false,
        products: [],
        productIndex: 0,
        productsPerPage: itemsPerPage || 30,
        selectedList: selectedList || 'default',
        isLoadingProducts: false
      }
    },
    async asyncData(context) {
      const { params, store, app, payload } = context
      const { handle } = params
      const { $nacelle } = app

      // Check if collection saved in vuex store
      const getCollection = store.getters['collections/getCollection']
      const storeCollection = getCollection(pageHandle || handle)

      if (storeCollection) {
        return {
          ...storeCollection
        }
      }

      // Check Nuxt Generate payload
      if (payload && payload.collectionData) {
        return {
          collection: payload.collectionData
        }
      }

      // Skip if Nuxt Server
      if (typeof process.server === 'undefined' || process.server) {
        return {}
      }

      // If not in store or payload fetch static data
      const collectionData = await $nacelle.data.collection({
        handle: pageHandle || handle,
        locale: locale
      }).catch(error => {
        console.warn(
          `Unable to find collection with handle, "${pageHandle || handle}".\n
Some page templates attempt to locate collections automatically, so this may not reflect a true error.`
        )
        return undefined
      })

      let products = []

      if (
        collectionData &&
        collectionData.collection &&
        collectionData.collection.productLists
      ) {
        products = await $nacelle.data.collectionPage({
          collection: collectionData,
          list: selectedList || 'default',
          paginate: true,
          itemsPerPage: itemsPerPage || 30,
          locale: locale
        })
      }

      // Create collection object for vuex store and returned async data
      const collectionObj = {
        handle: pageHandle || handle,
        collection: collectionData,
        products,
        productIndex: products.length,
        selectedList: selectedList || 'default'
      }

      store.commit('collections/addCollection', collectionObj)

      return collectionObj
    },
    computed: {
      selectedProductList() {
        if (
          this.collection &&
          Array.isArray(this.collection.productLists)
        ) {
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
    async created() {
      // Flag for determining if we update collection in vuex store
      let updateCollection = false

      this.handle = pageHandle || this.$route.params.handle

      if (process.browser) {
        // If no collection data, fetch
        if (!this.collection && !this.noCollectionData) {
          this.collection = await this.$nacelle.data.collection({
            handle: this.handle,
            locale: locale
          }).catch(error => {
            console.warn(
              `Unable to find collection with handle, "${this.handle}".\n
Some page templates attempt to locate collections automatically, so this may not reflect a true error.`
            )
            return undefined
          })
          updateCollection = true
        }

        // Try to get product data if products array is empty
        if (this.products.length === 0) {
          if (this.collection && this.collection.productLists) {
            this.isLoadingProducts = true
            this.products = await this.$nacelle.data.collectionPage({
              collection: this.collection,
              list: this.selectedList,
              paginate: true,
              itemsPerPage: this.productsPerPage,
              locale: locale
            })
            updateCollection = true
          }
        }
      }

      this.isLoadingProducts = false
      this.productIndex = this.products.length

      if (updateCollection) {
        this.updateCollection({
          handle: this.handle,
          collection: this.collection,
          products: this.products,
          productIndex: this.products.length,
          selectedList: this.selectedList
        })
      }
    },
    methods: {
      ...mapMutations('collections', ['updateCollection']),
      async fetchMore() {
        if (
          !this.isLoadingProducts &&
          this.collection &&
          this.productIndex < this.selectedProductList.length
        ) {
          this.isLoadingProducts = true

          const nextPageProducts = await this.$nacelle.data.collectionPage({
            collection: this.collection,
            list: this.selectedList,
            paginate: true,
            index: this.productIndex,
            itemsPerPage: this.productsPerPage,
            locale: locale
          })

          this.products = [
            ...this.products,
            ...nextPageProducts
          ]
          this.productIndex += this.productsPerPage
          this.isLoadingProducts = false
          this.updateCollection({
            handle: this.handle,
            collection: this.collection,
            products: this.products,
            productIndex: this.productIndex
          })
        }
      }
    }
  }
}
