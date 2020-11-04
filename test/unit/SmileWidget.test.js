import { mount } from '@vue/test-utils'
import SmileWidget from '~/components/SmileWidget.vue'

const script = document.createElement('script')
document.body.appendChild(script)

const wrapper = mount(SmileWidget, {
  propsData: {
    customer: {
      id: '123abc',
      digest: '',
    },
  },
  mocks: {
    $nacelle: {
      spaceID: 'my-space-id',
    },
    $smile: {
      credentials: {
        apiKey: 'my-api-key',
        encryptedSecret: 'so-secret',
      },
    },
  },
})

describe('SmileWidget', () => {
  it('should mount', () => {
    const component = wrapper.find('.sweettooth-init')
    expect(component).not.toBeUndefined()
  })
})
