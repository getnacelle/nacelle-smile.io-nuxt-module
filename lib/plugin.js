import AES from 'crypto-js/aes'
import Vue from 'vue'
import SmileWidget from './nacelle/integrations/SmileWidget.vue'

Vue.component('smile-widget', SmileWidget)

function warnMissing() {
  console.warn(`Warning! Smile.io credentials not found. Please provide the Smile.io secret & key in the 'nacelle' block of nuxt.config.js:\n
      
  // nuxt.config.js

  nacelle: {
    // other config,
    smile: {
      key: process.env.SMILE_API_KEY,
      secret: process.env.SMILE_SECRET
    }
  }\n\n`)
}

export default function (_, inject) {
  const secret = '<%= options.secret %>'
  const key = '<%= options.key %>'
  const spaceId = '<%= options.spaceID %>'

  if (!secret || !key) {
    warnMissing()
  }

  inject('smile', {
    credentials: {
      apiKey: key,
      encryptedSecret: AES.encrypt(secret, spaceId),
    },
  })
}
