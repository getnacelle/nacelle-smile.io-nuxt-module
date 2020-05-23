import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import NacelleProducts from '@/components/nacelle/NacelleProducts'
import storeConfig from '../storeConfig'
import nacellePlugin from '../mocks/nacelle-vue-plugin'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(nacellePlugin)

const store = new Vuex.Store(storeConfig())

const delay = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

describe('NacelleProducts.vue', () => {
  global.process.client = true

  it('loads single product', async() => {
    const wrapper = mount(NacelleProducts, {
      localVue,
      store,
      propsData: {
        handle: 'gray-t-shirt'
      }
    })

    await delay() // mock data-loader loading product data

    expect(typeof wrapper.vm.product !== 'undefined').toBe(true)
  })

  it('loads an array of products', async() => {
    const wrapper = mount(NacelleProducts, {
      localVue,
      store,
      propsData: {
        handles: ['gray-t-shirt', 'gray-t-shirt']
      }
    })

    await delay() // mock data-loader loading product data

    expect(wrapper.vm.products.length).toBe(2)
  })
})
