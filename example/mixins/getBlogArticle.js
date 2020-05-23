export default (config = {}) => {
  return {
    data() {
      return {
        handle: null,
        blogHandle: null,
        article: null,
        noArticleData: false
      }
    },
    async asyncData(context) {
      const { params, payload, app } = context
      const { $nacelle } = app
      const { handle, blogHandle } = params

      if (payload && payload.articleData) {
        return {
          article: payload.articleData
        }
      }

      if (typeof process.server === 'undefined' || process.server) {
        return {}
      }

      const articleData = await $nacelle.data.article({
        handle: config.handle || handle,
        blogHandle: config.blogHandle || blogHandle,
        locale: config.locale
      }).catch(error => {
        console.warn(
          `Unable to find article data for handle, "${config.handle || handle}".\n
Some page templates attempt to locate article data automatically, so this may not reflect a true error.`
        )
        return undefined
      })

      return {
        article: articleData
      }
    },
    async created() {
      this.handle = config.articleHandle || this.$route.params.handle
      this.blogHandle = config.blogHandle || this.$route.params.blogHandle

      if (
        process.browser &&
        !this.article &&
        !this.noArticleData
      ) {
        this.article = await this.$nacelle.data.article({
          handle: this.handle,
          blogHandle: this.blogHandle,
          locale: config.locale
        }).catch(error => {
          console.warn(
            `Unable to find article data for handle, "${this.handle}".\n
  Some page templates attempt to locate article data automatically, so this may not reflect a true error.`
          )
          return undefined
        })
      }
    }
  }
}
