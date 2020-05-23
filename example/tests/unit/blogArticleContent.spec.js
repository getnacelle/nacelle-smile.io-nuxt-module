import { mount, createLocalVue } from '@vue/test-utils'
import storeConfig from '../storeConfig'
import { shopifyArticle, contentfulArticle } from '../mocks/defaultObjects.js'
import BlogArticleContent from '~/components/nacelle/BlogArticleContent'

import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlogArticleContent.vue', () => {
  it('renders article contents', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = mount(BlogArticleContent, {
      store,
      localVue,
      propsData: {
        article: shopifyArticle
      }
    })

    expect(wrapper.find('.content > p').html()).toBe("<p>I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.<br><br>Sensors indicate no shuttle or other ships in this sector. According to coordinates, we have traveled 7,000 light-years and are located near the system J-25. Tractor beam released, sir. Force field maintaining our hull integrity. Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed. Without our shields, at this range, it is probable a photon detonation could destroy the Enterprise.</p>")
  })

  it('renders contentful article contents', async() => {
    const store = new Vuex.Store(storeConfig())
    const wrapper = mount(BlogArticleContent, {
      store,
      localVue,
      propsData: {
        article: contentfulArticle
      }
    })

    expect(wrapper.find('.content > p').html()).toBe("<p>Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.' All transporters off.</p>")
  })
})
