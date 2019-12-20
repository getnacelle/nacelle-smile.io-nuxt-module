<template>
  <div>
    <client-only>
      <div class="sweettooth-init" :data-channel-api-key="smileApiKey" v-bind="customerData" />
      <div class="sweettooth-launcher" />
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customerData: {}
    }
  },
  computed: {
    smileApiKey() {
      if (this.$nacelle && this.$nacelle.smileKey) {
        return this.$nacelle.smileKey
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
    }
  },
  methods: {
    getCookieValue(a) {
      const b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)')
      return b ? decodeURIComponent(b.pop()) : ''
    }
  }
}
</script>
