export default ({ pageHandle, locale } = {}) => {
  return {
    data() {
      return {
        handle: null,
        page: null,
        noPageData: false
      }
    },
    async asyncData(context) {
      const { params, app, payload } = context
      const { handle } = params
      const { $nacelle } = app

      if (payload && payload.pageData) {
        return {
          page: payload.pageData
        }
      }

      if (typeof process.server === 'undefined' || process.server) {
        return {}
      }

      const pageData = await $nacelle.data.page({
        handle: pageHandle || handle,
        locale: locale
      }).catch(error => {
        console.warn(
          `Unable to find page data for handle, "${pageHandle || handle}".\n
Some page templates attempt to locate page data automatically, so this may not reflect a true error.`
        )
        return undefined
      })

      return {
        page: pageData
      }
    },
    async created() {
      this.handle = pageHandle || this.$route.params.handle

      if (process.browser && !this.page && !this.noPageData) {
        const pageData = await this.$nacelle.data.page({
          handle: this.handle,
          locale: locale
        }).catch(error => {
          console.warn(
            `Unable to find page data for handle, "${this.handle}".\n
  Some page templates attempt to locate page data automatically, so this may not reflect a true error.`
          )
          return undefined
        })

        if (pageData) {
          if (pageData.noData) {
            this.noPageData = true
          } else {
            this.page = pageData
          }
        } else {
          this.noPageData = true
        }
      }
    }
  }
}
