<template>
  <div class="nacelle content-data-load">
    <slot v-if="content" :content="content" />
  </div>
</template>

<script>
export default {
  props: {
    handle: {
      type: String,
      default: ''
    },
    locale: {
      type: String,
      default: ''
    },
    blogHandle: {
      type: String,
      default: 'blog'
    },
    type: {
      type: String,
      default: 'content'
    }
  },
  data() {
    return {
      content: undefined
    }
  },
  computed: {
    useLocale() {
      if (this.locale && this.locale !== '') {
        return this.locale
      }

      if (this.$nacelle && this.$nacelle.locale) {
        return this.$nacelle.locale
      }

      return 'en-us'
    }
  },
  created() {
    if (process.browser || process.client) {
      this.$nacelle.data
        .content({
          handle: this.handle,
          type: this.type,
          locale: this.useLocale,
          blogHandle: this.blogHandle
        })
        .then(result => {
          if (result) {
            this.content = result
          }
        })
    }
  }
}
</script>

<style></style>
