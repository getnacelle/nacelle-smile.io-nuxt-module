import AES from 'crypto-js/aes';
import Vue from 'vue'
import SmileWidget from './nacelle/integrations/SmileWidget.vue'


Vue.component('smile-widget', SmileWidget)

export default function (context, inject) {

  const credentials = () => {
    const { settings } = <%= JSON.stringify(options) %> //eslint-disable-line
    const { smile: { secret, key } } = settings

    const encryptedSecret = AES
      .encrypt(secret, settings.spaceID)

    return {
      apiKey: key,
      encryptedSecret
    }
  }
  inject('smile', { credentials })
}
