import Vue from 'vue'
import SmileWidget from './nacelle/integrations/SmileWidget.vue'

Vue.component('smile-widget', SmileWidget)

if (process.browser) {
  const smileScript = document.createElement('script')
  smileScript.type = 'text/javascript'
  smileScript.src = '//cdn.sweettooth.io/assets/storefront.js'
  smileScript.charset = 'utf-8'
  smileScript.defer = true
  smileScript.async = false
  document.getElementsByTagName('head')[0].appendChild(smileScript)
}
