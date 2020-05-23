import { shallowMount } from '@vue/test-utils'
import InterfaceFeaturedMedia from '@/components/nacelle/InterfaceFeaturedMedia'

describe('InterfaceFeaturedMedia.vue', () => {
  it('renders an image if media type is image', async() => {
    const wrapper = shallowMount(InterfaceFeaturedMedia, {
      propsData: {
        media: {
          src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
          type: 'image/jpeg'
        }
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
