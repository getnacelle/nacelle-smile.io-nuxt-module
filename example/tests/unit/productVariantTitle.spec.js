import { shallowMount } from '@vue/test-utils'
import ProductVariantTitle from '@/components/nacelle/ProductVariantTitle'

describe('ProductVariantTitle.vue', () => {
  it('renders a variant title', async() => {
    const wrapper = shallowMount(ProductVariantTitle, {
      propsData: { title: 'Great Product' }
    })
    expect(wrapper.html()).toBe('<p class="variant-title nacelle">Great Product</p>')
  })
})
