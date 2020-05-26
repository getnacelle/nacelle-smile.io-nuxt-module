import storeConfig from '../storeConfig'
import Vue from 'vue'
import Vuex from 'vuex'

import { defaultProduct } from '../mocks/defaultObjects'
Vue.use(Vuex)

describe('Event Store', () => {
  it('sets the product in vuex store', () => {
    const store = new Vuex.Store(storeConfig())
    store.commit('product/setProduct', defaultProduct)

    expect(store.state.product.product.id)
      .toEqual(defaultProduct.id)
  })

  it('gets first variant if no variant selected', () => {
    const store = new Vuex.Store(storeConfig())
    store.commit('product/setProduct', defaultProduct)

    expect(store.getters['product/currentVariant'].id)
      .toEqual(defaultProduct.variants[0].id)
  })

  it('sets the selected variant', () => {
    const store = new Vuex.Store(storeConfig())
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
      price: '29.99'
    }

    store.commit('product/setProduct', defaultProduct)
    store.commit('product/setSelectedVariant', variant)

    expect(store.state.product.selectedVariant.id)
      .toEqual(variant.id)
  })

  it('sets the selected variant by id', () => {
    const store = new Vuex.Store(storeConfig())
    const variantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='

    store.commit('product/setProduct', defaultProduct)
    store.commit('product/setSelectedVariantById', variantId)

    expect(store.state.product.selectedVariant.id)
      .toEqual(variantId)
  })
})
