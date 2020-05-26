import { mount } from '@vue/test-utils'
import FormConsentField from '@/components/nacelle/FormConsentField'

const wrapper = mount(FormConsentField)
const fieldset = wrapper.find('fieldset')
const inputs = fieldset.findAll('input')
const title = wrapper.find('#field-title')
const description = wrapper.find('#field-description')

describe('FormConsentField.vue', () => {
  it('renders a fieldset for a consent form', async() => {
    expect(fieldset.exists()).toBe(true)
  })

  it('renders radio inputs inside the fieldset', async() => {
    expect(inputs.at(0).attributes().type).toBe('radio')
    expect(inputs.at(1).attributes().type).toBe('radio')
  })

  it('renders sample code for adding a title via a named template', async() => {
    expect(title.html()).toBe('<h3 id="field-title">\n  Add a title with:\n  <code>&lt;template v-slot:title&gt;Section Title&lt;/template&gt;</code></h3>')
  })

  it('renders sample code for adding a description via a named template', async() => {
    expect(description.html()).toBe('<p id="field-description">\n  Add a description with:\n  <code>&lt;template v-slot:description&gt;Section Description Goes Here&lt;/template&gt;</code></p>')
  })
})
