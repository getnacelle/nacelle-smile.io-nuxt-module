import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '../storeConfig'
import nacellePlugin from '../mocks/nacelle-vue-plugin'
import NacelleCollection from '@/components/nacelle/NacelleCollection'

const delay = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 200)
  })

describe('NacelleCollection.vue', () => {
  global.process.client = true

  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      observe() {
        return null
      }

      unobserve() {
        return null
      }
    }
  })

  it('loads a collection', async() => {
    const localVue = createLocalVue()
    localVue.use(nacellePlugin)
    localVue.use(Vuex)
    const store = new Vuex.Store(storeConfig())

    const wrapper = shallowMount(NacelleCollection, {
      localVue,
      store,
      propsData: {
        handle: 'test'
      }
    })

    await delay() // mock data-loader loading product data

    expect(typeof wrapper.vm.collection !== 'undefined').toBe(true)
  })

  it('loads a collection from vuex store', async() => {
    const id = 'i am from the store'
    const handle = 'test'
    const localVue = createLocalVue()
    localVue.use(nacellePlugin)
    localVue.use(Vuex)
    const store = new Vuex.Store(storeConfig())

    // update test collection in store with dummy data
    store.commit('collections/updateCollection', {
      handle,
      collection: {
        id
      },
      products: [
        {}, {}, {}
      ],
      productIndex: 3
    })

    const wrapper = shallowMount(NacelleCollection, {
      localVue,
      store,
      propsData: {
        handle
      }
    })

    await delay() // mock data-loader loading product data

    expect(wrapper.vm.collection.id).toEqual(id)
  })
})
