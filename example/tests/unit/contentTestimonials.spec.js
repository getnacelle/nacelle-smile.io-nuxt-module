import { mount, createLocalVue } from '@vue/test-utils'
import ContentTestimonials from '~/components/nacelle/ContentTestimonials'

describe('ContentTestimonials.vue', () => {
  const slides = [
    {
      name: '@username1',
      quote: 'Lorem ipsum'
    },
    {
      name: '@username-two',
      quote: 'Lorem ipsum'
    },
    {
      name: '@user-three',
      quote: 'Lorem ipsum'
    }
  ]

  it('renders a testimonial for each slide prop', async() => {
    const wrapper = mount(ContentTestimonials, {
      propsData: {
        slides
      }
    })

    expect(wrapper.findAll('li')).toHaveLength(slides.length)
  })
})
