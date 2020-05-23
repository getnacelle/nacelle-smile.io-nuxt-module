import { shallowMount } from '@vue/test-utils'
import CtaButton from '@/components/nacelle/CtaButton'

describe('CtaButton.vue', () => {
  it('renders a button by default', async() => {
    const wrapper = shallowMount(CtaButton, {
      propsData: { to: '/test' }
    })
    expect(wrapper.contains('button')).toBe(true)
  })

  it('renders a element for external link', () => {
    const wrapper = shallowMount(CtaButton, {
      propsData: { to: 'https://www.google.com' }
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.attributes('href')).toBe('https://www.google.com')
  })
})
