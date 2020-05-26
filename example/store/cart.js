import localforage from 'localforage'
import { uuid } from 'uuidv4'
import isEqual from 'lodash.isequal'

export const state = () => ({
  lineItems: [],
  checkoutId: null,
  checkoutUrl: null,
  checkoutComplete: false,
  cartVisible: false,
  freeShippingThreshold: null,
  error: null
})
export const getters = {
  quantityTotal(state) {
    if (state.lineItems.length >= 1) {
      return state.lineItems.reduce((acc, item) => acc + item.quantity, 0)
    }

    return 0
  },

  cartSubtotal(state) {
    if (state.lineItems.length >= 1) {
      return state.lineItems.reduce(
        (acc, item) => acc + item.variant.price * item.quantity,
        0
      )
    }

    return 0
  },

  freeShippingThresholdPassed(state, getters) {
    if (
      getters.cartSubtotal &&
      state.freeShippingThreshold &&
      getters.cartSubtotal > state.freeShippingThreshold
    ) {
      return true
    } else {
      return false
    }
  },

  amountUntilFreeShipping(state, getters) {
    if (getters.cartSubtotal != null && state.freeShippingThreshold) {
      return state.freeShippingThreshold - getters.cartSubtotal
    }
  },

  checkoutLineItems(state) {
    if (state.lineItems.length > 0) {
      return state.lineItems.map(lineItem => ({
        cartItemId: lineItem.id,
        variantId: lineItem.variant.id,
        quantity: lineItem.quantity,
        metafields: lineItem.metafields
      }))
    } else {
      return []
    }
  },

  checkoutIdForBackend(state) {
    let checkoutId
    if (state.checkoutId == null) {
      checkoutId = ''
    } else {
      checkoutId = state.checkoutId
    }
    return checkoutId
  }
}

export const mutations = {
  addLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex((lineItem) => {
      if (lineItem.variant.id === payload.variant.id) {
        const areMetafieldsEqual = isEqual(payload.metafields, lineItem.metafields)

        return areMetafieldsEqual // match only if metafields are the same.
      }
    })
    if (index === -1) {
      // generate unique id for line
      payload.id = `${payload.variant.id}::${uuid()}`
      state.lineItems.push(payload)
    } else {
      state.lineItems[index].quantity += payload.quantity
    }
  },

  removeLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex(
      lineItem => lineItem.id === payload
    )
    state.lineItems.splice(index, 1)
  },

  incrementLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex(
      lineItem => lineItem.id === payload
    )
    if (index !== -1) {
      state.lineItems[index].quantity++
    }
  },

  decrementLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex(
      lineItem => lineItem.id === payload
    )
    if (index !== -1 && state.lineItems[index].quantity >= 1) {
      state.lineItems[index].quantity--
      if (state.lineItems[index].quantity === 0) {
        state.lineItems.splice(index, 1)
      }
    }
  },

  setLineItems(state, payload) {
    state.lineItems.splice(0)
    state.lineItems = payload
  },

  setCheckoutId(state, payload) {
    state.checkoutId = payload
  },

  setCheckoutUrl(state, payload) {
    state.checkoutUrl = payload
  },

  setCheckoutCompleteStatus(state, payload) {
    state.checkoutComplete = payload
  },

  showCart(state) {
    state.cartVisible = true
  },

  hideCart(state) {
    state.cartVisible = false
  },

  toggleCart(state) {
    state.cartVisible = !state.cartVisible
  },

  setFreeShippingThreshold(state, payload) {
    state.freeShippingThreshold = payload
  },

  setCartError(state, error) {
    state.error = error
  }
}

export const actions = {
  async addLineItem(context, payload) {
    context.commit('addLineItemMutation', payload)
    context.dispatch('saveLineItems', context.state.lineItems)
    // context.commit('showCart')
    if (context.rootState.events) {
      context.dispatch(
        'events/addToCart',
        {
          product: payload,
          cart: context.state.lineItems
        },
        { root: true }
      )
    }
  },

  async removeLineItem({ state, rootState, dispatch, commit }, payload) {
    if (rootState.events) {
      const lineItem = state.lineItems.find(
        item => item.variant.id === payload
      )
      dispatch(
        'events/removeFromCart',
        {
          product: lineItem,
          cart: state.lineItems
        },
        { root: true }
      )
    }

    commit('removeLineItemMutation', payload)
    dispatch('saveLineItems', state.lineItems)
  },

  async incrementLineItem(context, payload) {
    context.commit('incrementLineItemMutation', payload)
    context.dispatch('saveLineItems', context.state.lineItems)
  },

  async decrementLineItem(context, payload) {
    context.commit('decrementLineItemMutation', payload)
    context.dispatch('saveLineItems', context.state.lineItems)
  },

  async saveLineItems(context) {
    localforage.setItem('line-items', context.state.lineItems)
  },

  async getLineItems(context) {
    const lineItems = await localforage.getItem('line-items')
    if (lineItems != null) {
      context.commit('setLineItems', lineItems)
    }
  },

  async saveCheckoutId(context, payload) {
    localforage.setItem('checkout-id', payload)
  },

  async saveCheckoutUrl(context, payload) {
    localforage.setItem('checkout-url', payload)
  },

  async getCheckoutId(context) {
    const checkoutId = await localforage.getItem('checkout-id')
    if (checkoutId != null) {
      context.commit('setCheckoutId', checkoutId)
      return checkoutId
    }
  },

  async getCheckoutUrl(context) {
    const checkoutUrl = await localforage.getItem('checkout-url')
    if (checkoutUrl != null) {
      context.commit('setCheckoutUrl', checkoutUrl)
      return checkoutUrl
    }
  },

  async verifyCheckoutStatus(context) {
    await context.dispatch('getCheckoutId')
    await context.dispatch('getCheckoutUrl')

    if (
      context.state.checkoutId != null &&
      context.state.checkoutUrl != null
    ) {
      const checkoutStatus = await this.$nacelle.checkout.get({
        id: context.state.checkoutId,
        url: context.state.checkoutUrl
      }).then(checkoutObj => checkoutObj.completed)

      context.commit('setCheckoutCompleteStatus', checkoutStatus)
    }
  },
  async removeLineItemsIfCheckoutComplete(context) {
    if (context.state.checkoutComplete === true) {
      await localforage.removeItem('line-items')
      await localforage.removeItem('checkout-id')
      await localforage.removeItem('checkout-url')
    }
  },

  async updateLocalCart(context) {
    await context.dispatch('verifyCheckoutStatus')
    await context.dispatch('removeLineItemsIfCheckoutComplete')
    await context.dispatch('getLineItems')
  },

  async createCheckoutArray({ getters }) {
    let lineItems = ''
    getters.checkoutLineItems.forEach(item => {
      lineItems += `{
        variantId: "${item.variantId}",
        quantity: ${item.quantity}
      }`
    })
    return lineItems
  },

  async getCheckoutIdForBackend({ state }) {
    let checkoutId
    if (state.checkoutId == null) {
      checkoutId = ''
    } else {
      checkoutId = state.checkoutId
    }
    return checkoutId
  },

  async getLinkerParam() {
    return new Promise((resolve, reject) => {
      const gaClient = process.browser ? window.ga : undefined

      if (typeof gaClient !== 'undefined') {
        gaClient((tracker) => resolve(tracker.get('linkerParam')))
      }

      // if no ga resolve with empty string
      resolve('')
    })
  },

  async saveAndRedirect({ dispatch, rootState }, payload) {
    if (payload && process.browser) {
      await dispatch('saveCheckoutId', payload.id)

      let url
      const linkerParam = await dispatch('getLinkerParam')

      if (payload.url.includes('?')) {
        url = `${payload.url}&c=${JSON.stringify(rootState.user.userData)}&${linkerParam}`
      } else {
        url = `${payload.url}?c=${JSON.stringify(rootState.user.userData)}&${linkerParam}`
      }

      await dispatch('saveCheckoutUrl', url)

      window.location = url
    }
  },

  async processCheckout(
    { state, dispatch, commit, rootState, context },
    payload
  ) {
    // let lineItems = await dispatch('createCheckoutArray')
    // let checkoutId = await dispatch('getCheckoutIdForBackend')

    if (rootState.events) {
      dispatch('events/checkoutInit', { cart: state.lineItems }, { root: true })
    }

    await dispatch('saveAndRedirect', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
