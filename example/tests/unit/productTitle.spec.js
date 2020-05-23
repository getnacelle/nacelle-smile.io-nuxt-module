import { shallowMount, createLocalVue } from '@vue/test-utils'
import storeConfig from '../storeConfig'
import ProductTitle from '@/components/nacelle/ProductTitle'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProductTitle.vue', () => {
  it('renders a title', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = shallowMount(ProductTitle, {
      store,
      localVue,
      propsData: { title: 'Great Product' }
    })
    expect(wrapper.html()).toBe('<h3 class="product-title nacelle">Great Product</h3>')
  })

  it('renders a specific html element when passed', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = shallowMount(ProductTitle, {
      store,
      localVue,
      propsData: { title: 'Great Product', element: 'h2' }
    })
    expect(wrapper.html()).toBe('<h2 class="product-title nacelle">Great Product</h2>')
  })
})
