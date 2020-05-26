import { mount, createLocalVue } from '@vue/test-utils'
import storeConfig from '../storeConfig'
import ProductOptionSwatches from '@/components/nacelle/ProductOptionSwatches'

import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProductOptionSwatch.vue', () => {
  const store = new Vuex.Store(storeConfig())
  const wrapper = mount(ProductOptionSwatches, {
    store,
    propsData: {
      option: {
        name: 'Size',
        values: [{ value: 'Small' }, { value: 'Medium' }, { value: 'Large' }]
      },
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
  it('renders swatches', async() => {
    expect(wrapper.findAll('.swatches').exists()).toBe(true)
  })
})
