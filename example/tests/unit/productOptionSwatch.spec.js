import { shallowMount } from '@vue/test-utils'
import ProductOptionSwatch from '@/components/nacelle/ProductOptionSwatch'

describe('ProductOptionSwatch.vue', () => {
  const wrapper = shallowMount(ProductOptionSwatch, {
    propsData: {
      value: 'Small',
      optionName: 'Size',
      swatchStyle: 'tab',
      selectedOptions: [],
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODg3MjA2MTcxNDUzNw==',
          price: '43.0',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            },
            {
              name: 'Color',
              value: 'Red'
            }
          ],
          swatchSrc:
            'https://nacell-demo-assets.s3.amazonaws.com/swatches/Red.png'
        }
      ]
    }
  })
  it('renders a swatch', async() => {
    expect(wrapper.findAll('div').exists()).toBe(true)
    expect(wrapper.text()).toBe('Small')
  })
  it('emits an event when clicked', () => {
    wrapper.trigger('click')
    expect(wrapper.emitted().swatchValue).toBeTruthy()
  })
})
