const eventProperties = rootState => {
  const { user, space, cart } = rootState || {}
  const timestamp = Date.now()
  const spaceID = space ? space.id : null
  const userID = user && user.userID ? user.userID : null
  const anonymousID = user && user.anonymousID ? user.anonymousID : null
  const cartJsonString =
    cart && cart.lineItems
      ? JSON.stringify(cart.lineItems)
      : null
  let urlParams = null
  let domain = null
  let url = null

  if (process.browser) {
    urlParams = window.location.search
    domain = window.location.origin
    url = window.location.href
  }

  return {
    timestamp,
    spaceID,
    userID,
    anonymousID,
    user,
    cart: cartJsonString,
    urlParams,
    url,
    domain
  }
}
export const state = () => ({
  log: []
})

export const mutations = {
  addEvent(state, event) {
    state.log.push(event)
  }
}

export const actions = {
  pageView({ commit, rootState }, payload) {
    commit('addEvent', {
      eventType: 'PAGE_VIEW',
      payload,
      ...eventProperties(rootState)
    })
  },

  productView({ commit, rootState }, product) {
    commit('addEvent', {
      eventType: 'PRODUCT_VIEW',
      payload: { product },
      ...eventProperties(rootState)
    })
  },

  addToCart({ commit, rootState }, payload) {
    commit('addEvent', {
      eventType: 'ADD_TO_CART',
      payload,
      ...eventProperties(rootState)
    })
  },

  removeFromCart({ commit, rootState }, payload) {
    commit('addEvent', {
      eventType: 'REMOVE_FROM_CART',
      payload,
      ...eventProperties(rootState)
    })
  },

  checkoutInit({ commit, rootState }, payload) {
    commit('addEvent', {
      eventType: 'CHECKOUT_INIT',
      payload,
      ...eventProperties(rootState)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
