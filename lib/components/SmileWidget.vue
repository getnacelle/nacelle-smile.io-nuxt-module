<template>
  <div>
    <div
      class="sweettooth-init"
      :data-channel-api-key="smileApiKey"
      :data-external-customer-id="customerId"
      :data-customer-auth-digest="digest"
    />
    <div class="sweettooth-launcher" />
  </div>
</template>

<script>
import md5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';
export default {
  props: ['customer'],
  data() {
    return {
      customerData: {}
    }
  },
  computed: {
    smileApiKey() {
      if (this.$smile) {
        const creds = this.$smile.credentials()
        return creds.apiKey || ''
      }

      return ''
    },
    digest() {
      if (this.customerData['data-customer-auth-digest']) {
        return this.customerData['data-customer-auth-digest']
      }

      if (this.customer) {
        const creds = this.$smile.credentials()
        const bytes  = AES.decrypt(creds.encryptedSecret, this.$nacelle.spaceID);
        const digest = md5(`${this.customer.id}${bytes.toString(encUTF8)}`)
        return digest
      }

      return ''
    },
    customerId() {
      if (this.customerData['data-external-customer-id']) {
        return this.customerData['data-external-customer-id']
      }

      if (this.customer) {
        return this.customer.id
      }

      return ''
    }
  },
  mounted() {
    const smileCookie = this.getCookieValue('nacelle_smile_user')
    const smileData =
      smileCookie.length > 0 ? JSON.parse(smileCookie) : undefined

    if (smileData && smileData.digest && smileData.digest.length > 0) {
      this.customerData['data-external-customer-id'] = smileData.customerId
      this.customerData['data-customer-auth-digest'] = smileData.digest
      // Needed to update computed properties
      this.customer = this.customer ? customer : null
    }

    document.onreadystatechange = () => { 
      if (document.readyState == "complete") { 
        this.loadScript()
      } 
    }
  },
  methods: {
    getCookieValue(a) {
      const b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)')
      return b ? decodeURIComponent(b.pop()) : ''
    },
    loadScript() {
      // Get the first script element on the page
      const ref = document.getElementsByTagName( 'script' )[ 0 ];

      // Create a new script element
      const script = document.createElement( 'script' );

      // Set the script element `src`
      script.src = '//cdn.sweettooth.io/assets/storefront.js';

      // Inject the script into the DOM
      ref.parentNode.insertBefore( script, ref );
    }
  }
}
</script>
