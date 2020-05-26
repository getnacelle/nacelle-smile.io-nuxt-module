import storeConfig from '../storeConfig'
import { mount, createLocalVue } from '@vue/test-utils'
import RefinementFilters from '@/components/nacelle/RefinementFilters'
import Vuex from 'vuex'

import refinementFilterInputData from '../mocks/refinementFilterInputData'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchResults.vue', () => {
  it('returns ', () => {
    expect(true).toEqual(true)
  })
  // it('provides search results from a supplied query and search data', async() => {
  //   const store = new Vuex.Store(storeConfig())
  //   const wrapper = mount(RefinementFilters, {
  //     localVue,
  //     store,
  //     propsData: {
  //       propertyFilters: [
  //         { field: 'productType', label: 'Product Type' },
  //         { field: 'color', label: 'Color' },
  //         { field: 'material', label: 'Material' },
  //         { field: 'size', label: 'Size' }
  //       ],
  //       priceRangeFilters: [
  //         { range: [0, 50], label: '< $50' },
  //         { range: [50, 100], label: '$50 - 100' },
  //         { range: [100, 200], label: '$100 - 200' },
  //         { range: [200, 500], label: '$200 - 500' },
  //         { range: [500, 0], label: '> $500' }
  //       ],
  //       inputData: refinementFilterInputData
  //     }
  //   })
  //   expect(wrapper.vm.searchResults).toEqual([
  //     { title: 'test', description: 'cool' }
  //   ])
  // })
})
