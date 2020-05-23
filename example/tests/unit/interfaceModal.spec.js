import { mount } from '@vue/test-utils'
import InterfaceModal from '@/components/nacelle/InterfaceModal'

describe('InterfaceModal.vue', () => {
  it('renders a modal', async() => {
    const wrapper = mount(InterfaceModal, { propsData: { modalOpen: true } })
    expect(wrapper.findAll('.modal-outer').isVisible()).toBe(true)
  })
  // it('closes the modal', async () => {
  //   const wrapper = mount(InterfaceModal, { propsData: { modalOpen: true } })
  //   wrapper.setProps({ modalOpen: false })
  //   expect(wrapper.find('.modal-outer').isVisible()).toBe(false)
  // })
})
