import { shallowMount } from '@vue/test-utils'
import ProductMediaSelectView from '@/components/nacelle/ProductMediaSelectView'

describe('ProductMediaSelectView.vue', () => {
  // it('renders a list of thumbnails', async () => {
  //   const wrapper = shallowMount(ProductMediaSelectView, {
  //     propsData: {
  //       media: [
  //         { src: 'test', type: 'image', id: 1 },
  //         { src: 'test2', type: 'image', id: 2 }
  //       ]
  //     }
  //   })
  //   const select = wrapper.find('.media-select')
  //   expect(select.html()).toBe(
  //     '<div class="media-select column is-12"><ul class="columns"><li class="column is-3"><img src="test"></li><li class="column is-3"><img src="test2"></li></ul></div>'
  //   )
  // })

  it('sets a media item as the selected item', async() => {
    const wrapper = shallowMount(ProductMediaSelectView, {
      propsData: {
        media: [
          { src: 'test', type: 'image', id: 1 },
          { src: 'test2', type: 'image', id: 2 }
        ],
        featuredMedia: { src: 'test', type: 'image', id: 1 }
      }
    })
    const input = wrapper.find('.media-item')
    input.trigger('click')
    expect(wrapper.vm.selectedMedia).toEqual({
      src: 'test',
      type: 'image',
      id: 1
    })
  })
  it('updates the mediaComponent computed', async() => {
    const wrapper = shallowMount(ProductMediaSelectView, {
      propsData: {
        media: [
          { src: 'test', type: 'image', id: 1 },
          { src: 'test2', type: 'image', id: 2 }
        ],
        featuredMedia: { src: 'test', type: 'image', id: 1 }
      }
    })
    const input = wrapper.find('.media-item')
    input.trigger('click')
    expect(wrapper.vm.mediaComponent).toEqual('ProductImage')
  })
})
