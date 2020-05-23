import { shallowMount } from '@vue/test-utils'
import ProductPrice from '@/components/nacelle/ProductPrice'

describe('ProductPrice.vue', () => {
  it('sets the price', async() => {
    const wrapper = shallowMount(ProductPrice, { propsData: { price: '25' } })
    expect(wrapper.vm.price).toBe('25')
  })
})
