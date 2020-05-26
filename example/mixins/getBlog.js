export default (config = {}) => {
  return {
    data() {
      return {
        handle: null,
        blog: null,
        articles: [],
        articleIndex: 0,
        articlesPerPage: config.itemsPerPage || 12,
        selectedList: config.selectedList || 'default',
        noBlogData: false,
        isLoadingArticles: false
      }
    },
    async asyncData(context) {
      const { params, app, payload } = context
      const { blogHandle } = params
      const { $nacelle } = app
      let articles = []

      if (payload && payload.blogData) {
        return {
          blog: payload.blogData
        }
      }

      if (typeof process.server === 'undefined' || process.server) {
        return {}
      }

      const blogData = await $nacelle.data.blog({
        handle: config.blogHandle || blogHandle,
        locale: config.locale || $nacelle.locale
      }).catch(error => {
        console.warn(
          `Unable to find blog data for handle, "${blogHandle || handle}".\n
Some page templates attempt to locate blog data automatically, so this may not reflect a true error.`
        )
        return undefined
      })

      if (blogData && blogData.blog && blogData.blog.articleLists) {
        articles = await $nacelle.data.blogPage({
          blog: blogData,
          selectedList: config.selectedList || 'default',
          paginate: true,
          itemsPerPage: config.itemsPerPage || 12,
          locale: config.locale || $nacelle.locale
        })
      }

      return {
        blog: blogData,
        articles,
        articleIndex: articles.length,
        selectedList: config.selectedList || 'default'
      }
    },
    async created() {
      this.handle = config.blogHandle || this.$route.params.blogHandle

      if (process.browser) {
        if (!this.blog && !this.noBlogData) {
          this.blog = await this.$nacelle.data.blog({
            handle: this.handle,
            locale: config.locale
          }).catch(error => {
            console.warn(
              `Unable to find blog data for handle, "${this.handle}".\n
    Some page templates attempt to locate blog data automatically, so this may not reflect a true error.`
            )
            return undefined
          })
        }

        if (this.blog && this.blog.articleLists) {
          this.isLoadingArticles = true
          this.articles = await this.$nacelle.data.blogPage({
            blog: this.blog,
            selectedList: this.selectedList || 'default',
            paginate: true,
            itemsPerPage: this.articlesPerPage || 12,
            locale: config.locale
          })
        } else {
          this.articles = []
        }
      }

      this.isLoadingArticles = false
      this.articleIndex = this.articles.length
    },
    computed: {
      selectedBlogList() {
        if (
          this.blog && 
          Array.isArray(this.blog.articleLists)
         ) {
          const list = this.blog.articleLists.find(list => {
            return list.slug === this.selectedList
          })

          if (list && Array.isArray(list.handles)) {
            return list.handles
          }
        }

        return []
      }
    },
    methods: {
      async fetchMore() {
        if (
          this.blog &&
          Array.isArray(this.articles) &&
          this.articles.length > 0 &&
          this.articleIndex < this.selectedBlogList.length
        ) {
          this.isLoadingArticles = true

          const nextPageArticles = await this.$nacelle.data.blogPage({
            blog: this.blog,
            selectedList: this.selectedList || 'default',
            paginate: true,
            itemsPerPage: this.articlesPerPage || 12,
            index: this.articleIndex,
            locale: config.locale
          })

          this.articles = [
            ...this.articles,
            ...nextPageArticles
          ]
          this.articleIndex += this.articlesPerPage
          this.isLoadingArticles = false
        }
      }
    }
  }
}
