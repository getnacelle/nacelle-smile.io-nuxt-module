import { mount, createLocalVue } from '@vue/test-utils'
import SearchResults from '@/components/nacelle/SearchResults'
import storeConfig from '../storeConfig'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchResults.vue', () => {
  it('provides search results from a supplied query and search data', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = mount(SearchResults, {
      localVue,
      store,
      propsData: {
        searchQuery: { value: 'test' },
        searchData: [
          { title: 'test', description: 'cool' },
          { title: 'wow', description: 'right.' }
        ]
      }
    })

    await wrapper.vm.searchResults

    expect(wrapper.vm.searchResults).toEqual([
      { title: 'test', description: 'cool' }
    ])
  })
})
