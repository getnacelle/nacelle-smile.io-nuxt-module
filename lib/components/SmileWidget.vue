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
      customerData: {
        id: '',
        digest: ''
      }
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
      const customer = this.customer || this.customerData
      if (customer.digest) {
        return customer.digest
      } else {
        const creds = this.$smile.credentials()
        const bytes  = AES.decrypt(creds.encryptedSecret, this.$nacelle.spaceID);
        const digest = md5(`${customer.id}${bytes.toString(encUTF8)}`)
        return digest
      }
    },
    customerId() {
      const customer = this.customer || this.customerData
      return customer.id
    }
  },
  mounted() {
    const smileCookie = this.getCookieValue('nacelle_smile_user')
    const smileData =
      smileCookie.length > 0 ? JSON.parse(smileCookie) : undefined

    if (smileData && smileData.digest && smileData.digest.length > 0) {
      this.customerData.id = smileData.customerId
      this.customerData.digest = smileData.digest
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
