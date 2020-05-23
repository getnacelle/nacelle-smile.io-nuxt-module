import { shallowMount } from '@vue/test-utils'
import ContentTestimonial from '@/components/nacelle/ContentTestimonial'

describe('ContentTestimonial.vue', () => {
  it('renders a testimonial', async() => {
    const wrapper = shallowMount(ContentTestimonial, {
      propsData: {
        name: 'user',
        quote: 'lorem ipsum...'
      }
    })

    expect(wrapper.contains('blockquote')).toBe(true)
    expect(wrapper.classes()).toContain('testimonial')
    expect(wrapper.contains('figure')).toBe(false)
  })

  it('renders image if image prop set', async() => {
    const wrapper = shallowMount(ContentTestimonial, {
      propsData: {
        name: 'user',
        quote: 'lorem ipsum...',
        imageUrl: 'https://placehold.it/400x400'
      }
    })

    expect(wrapper.find('figure').exists()).toBe(true)
  })
})
