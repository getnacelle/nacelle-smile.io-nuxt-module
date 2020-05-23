import { mount } from '@vue/test-utils'
import RadioInput from '@/components/nacelle/RadioInput'

const wrapper = mount(RadioInput)
const input = wrapper.find('input')

describe('RadioInput.vue', () => {
  it('renders a radio input', async() => {
    expect(input.exists()).toBe(true)
    expect(input.attributes().type).toBe('radio')
  })

  it('is checked when passed a checked prop', async() => {
    wrapper.setProps({
      checked: true
    })
    expect(wrapper.vm.checked).toBe(true)
    expect(input.attributes('aria-checked')).toBe('true')
  })
})
