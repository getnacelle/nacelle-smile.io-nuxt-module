import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProductImage from '@/components/nacelle/ProductImage'
import Vuex from 'vuex'

import storeConfig from '../storeConfig'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProductImage/vue', () => {
  it('renders an image', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = shallowMount(ProductImage, {
      store,
      localVue,
      propsData: {
        source:
          'https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg',
        alt: 'chair'
      },
      data: function() {
        return {
          visible: true
        }
      }
    })
    expect(wrapper.contains('picture')).toBe(true)
  })
})
