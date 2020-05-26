import { createLocalVue, shallowMount } from '@vue/test-utils'
import nacellePlugin from '../mocks/nacelle-vue-plugin'
import NacelleContent from '@/components/nacelle/NacelleContent'

const localVue = createLocalVue()

const delay = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

describe('NacelleContent.vue', () => {
  global.process.client = true

  it('loads content object', async() => {
    localVue.use(nacellePlugin)

    const wrapper = shallowMount(NacelleContent, {
      localVue,
      propsData: {
        handle: 'test'
      }
    })

    await delay() // mock data-loader loading content data

    expect(typeof wrapper.vm.content !== 'undefined').toBe(true)
  })
})
