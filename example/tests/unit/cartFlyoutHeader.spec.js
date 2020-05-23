import { mount } from '@vue/test-utils'
import CartFlyoutHeader from '@/components/nacelle/CartFlyoutHeader'

describe('CartFlyoutHeader.vue', () => {
  it('displays the cart header', async() => {
    const wrapper = mount(CartFlyoutHeader, {
      propsData: { title: 'Your Cart' }
    })
    expect(wrapper.contains('h3')).toBe(true)
  })
})
