import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import ContentHeroBanner from '@/components/nacelle/ContentHeroBanner'
import Vuex from 'vuex'

import storeConfig from '../storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeConfig())

const defaults = {
  backgroundImgUrl:
  'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img.png',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

const wrapperDefault = shallowMount(ContentHeroBanner, {
  store,
  localVue,
  propsData: { ...defaults }
})

const wrapperFullheight = shallowMount(ContentHeroBanner, {
  store,
  localVue,
  propsData: { ...defaults, size: 'fullheight' }
})

const mockClickHandler = jest.fn()

const wrapperCta = mount(ContentHeroBanner, {
  store,
  localVue,
  propsData: {
    ...defaults,
    ctaHandler: mockClickHandler
  }
})

describe('ContentHeroBanner.vue', () => {
  it('renders a banner', async () => {
    expect(wrapperDefault.classes()).toContain('hero')
  })

  it('is size medium by default', async () => {
    expect(wrapperDefault.classes()).toContain('is-medium')
  })

  it('is fullheight when supplied "fullheight" size prop', async () => {
    expect(wrapperFullheight.classes()).toContain('is-fullheight')
  })

  it('button click triggers custom event', () => {
    const button = wrapperCta.find('button')

    button.trigger('click')

    expect(mockClickHandler).toHaveBeenCalled()
  })
})
