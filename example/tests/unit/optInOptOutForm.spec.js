import { mount } from '@vue/test-utils'
import OptInOptOutForm from '@/components/nacelle/OptInOptOutForm'

const wrapper = mount(OptInOptOutForm)
const form = wrapper.find('form')
const title = wrapper.find('h2')
const submit = wrapper.find('#save')

describe('FormConsentField.vue', () => {
  it('renders a form', async() => {
    expect(form.exists()).toBe(true)
  })

  it('displays the default form title', async() => {
    expect(title.text()).toBe('Cookie Preferences')
  })

  it('renders a form submit button', async() => {
    expect(submit.exists()).toBe(true)
    expect(submit.attributes().type).toBe('submit')
  })

  it('has the "aria-pressed" attribute on the button, after the button is clicked', async() => {
    submit.trigger('click')
    setTimeout(() => {
      expect(submit.attributes('aria-pressed')).toBe('true')
    }, 200)
  })
})
