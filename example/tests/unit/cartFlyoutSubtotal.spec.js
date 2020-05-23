import storeConfig from '../storeConfig'
import { mount, createLocalVue } from '@vue/test-utils'
import CartFlyoutSubtotal from '@/components/nacelle/CartFlyoutSubtotal'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('CartFlyoutSubtotal.vue', () => {
  it('displays the cart subtotal', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = mount(CartFlyoutSubtotal, {
      store,
      localVue
    })
    store.dispatch('cart/addLineItem', {
      image: {
        source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
      },
      title: 'Gray T-Shirt',
      productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
      handle: 'gray-t-shirt',
      quantity: 1,
      variant: {
        price: '29.99',
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
      }
    })
    expect(wrapper.vm.cartSubtotal).toBe(29.99)
  })
})
