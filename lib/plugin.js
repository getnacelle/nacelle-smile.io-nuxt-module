import AES from 'crypto-js/aes';
import Vue from 'vue'
import SmileWidget from './nacelle/integrations/SmileWidget.vue'


Vue.component('smile-widget', SmileWidget)

export default function (context, inject) {

  const credentials = () => {
    const encryptedSecret = AES
      .encrypt(process.env.SMILE_SECRET, process.env.NACELLE_SPACE_ID)
      .toString()

    return {
      apiKey: process.env.SMILE_API_KEY,
      encryptedSecret
    }
  }
  inject('smile', { credentials })
}