import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '../storeConfig'
import CookieBanner from '@/components/nacelle/CookieBanner'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeConfig())

process.browser = true

describe('CookieBanner.vue', () => {
  const wrapper = mount(CookieBanner, {
    store,
    localVue,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })

  it('displays the accept button', async() => {
    await setTimeout(() => {}, 100)

    wrapper.setData({ visible: true })
    const button = wrapper.find('button')

    expect(button.html()).toBe(
`<button id="accept" type="button" tabindex="0" role="button" aria-pressed="false">
  Accept
</button>`
    )
  })

  it('closes after the "Accept" button is clicked', async() => {
    await setTimeout(() => {}, 100)

    wrapper.setData({ visible: true })
    const button = wrapper.find('button')

    button.trigger('click')

    setTimeout(() => {
      expect(wrapper.html()).toBe('<div><!----></div>')
    }, 200)
  })
})
