export const state = () => ({
  collections: []
})

export const getters = {
  getCollection: state => handle => {
    return state.collections.find(collection => (
      collection.handle === handle
    ))
  }
}

export const mutations = {
  addCollection(state, collection) {
    state.collections.push(collection)
  },

  updateCollection(state, collection) {
    if (collection && collection.handle) {
      const index = state.collections.findIndex(({ handle }) => {
        return handle === collection.handle
      })

      if (index > -1) {
        state.collections[index] = collection
      } else {
        state.collections.push(collection)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
