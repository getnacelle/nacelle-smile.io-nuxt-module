import { mapGetters } from 'vuex'

export default {
  props: {
    containerRef: {
      // The ref assigned to the image's containing element
      type: String,
      default: ''
    },
    reformat: {
      type: Boolean,
      default: true
    },
    resizeToScreenWidth: {
      type: Boolean,
      default: false
    },
    cropDirection: {
      type: String,
      default: 'center'
    },
    blurUp: {
      type: Boolean,
      default: false
    },
    byDominantColor: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data() {
    return {
      blankImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 5'%3E%3C/svg%3E",
      blurred: null,
      containerWidth: null,
      containerHeight: null,
      containerPosition: null,
      loaded: false,
      originCDN: null,
      validImage: true
    }
  },
  computed: {
    ...mapGetters('space', ['getMetafield']),
    cdn() {
      const supportedCDNs = ['shopify', 'cloudinary']
      const metafieldCDN = this.getMetafield('cdn', 'provider')
        ? this.getMetafield('cdn', 'provider').toLowerCase()
        : ''
      return supportedCDNs.includes(metafieldCDN) ? metafieldCDN : 'shopify'
    },
    cdnShopifyToCloudinary() {
      return this.originCDN === 'shopify' && this.cdn.toLowerCase() === 'cloudinary'
    },
    cloudinaryCanAutoFormat() {
      return Boolean(this.reformat && this.cdn.toLowerCase() === 'cloudinary' && this.cloudinaryCloudName)
    },
    cloudinaryCloudName() {
      return this.getMetafield('cdn', 'cloudinary-cloud-name')
    },
    cloudinaryUrlBase() {
      return `https://res.cloudinary.com/${this.cloudinaryCloudName}/image/fetch/`
    },
    fallbackImage() {
      return this.blankImage
    },
    loading() {
      return !this.loaded
    },
    placeholderImg(w, h) {
      return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"%3E%3C/svg%3E`
    },
    shopifyPathPrefix() {
      const path = this.getMetafield('cdn', 'shopify-path-prefix') || 'https://cdn.shopify.com/s/files/'
      return path.split('').reverse()[0] !== '/' ? path.concat('/') : path
    }
  },
  methods: {
    optimizeSource({ url = null, format = 'auto', width = null, height = null, crop = false } = {}) {
      let newSource
      if (typeof url === 'string') {
        if (this.fromShopifyCDN({ url })) {
          this.originCDN = 'shopify'
          const source = (this.cdn.toLowerCase() === 'cloudinary') ? this.shopifyToCloudinary({ url }) : url
          if (this.reformat && (!width && !height)) {
            newSource = this.reformatImage({
              src: source, format
            })
          } else if (this.reformat && (width || height)) {
            newSource = this.resizeImage({
              src: this.reformatImage({ src: source, format }),
              width: this.roundedUpToNearest50px(width),
              height: this.roundedUpToNearest50px(height),
              crop
            })
          } else if (!this.reformat && (width || height)) {
            newSource = this.resizeImage({
              src: source,
              width: this.roundedUpToNearest50px(width),
              height: this.roundedUpToNearest50px(height),
              crop
            })
          } else {
            newSource = source
          }
        } else newSource = url
        return newSource
      }
      return url
    },
    calculateContainer() {
      if ((process.client || process.browser) && this.containerRef) {
        this.containerHeight = this.$refs[this.containerRef].clientHeight
        this.containerWidth = this.$refs[this.containerRef].clientWidth
        this.containerPosition = window.getComputedStyle(
          this.$refs[this.containerRef]
        ).position
      }
    },
    onLoaded() {
      this.loaded = true
    },
    fallback() {
      this.validImage = false
    },
    getBlurred({ src = null } = {}) {
      return this.shopifyResize({
        src,
        width: 20,
        height: ''
      })
    },
    getDominantColor({ src = null } = {}) {
      return this.shopifyResize({
        src,
        width: 1,
        height: ''
      })
    },
    roundedUpToNearest50px(x) {
      if (x >= 50) {
        return +x + 49 - ((+x + 49) % 50)
      }
      // Return a blank string if less than 50px
      return ''
    },
    resizeImage({ src = null, width = null, height = null, crop = false } = {}) {
      if (this.cdn.toLowerCase() === 'cloudinary') {
        return this.cloudinaryResize({ src, width, height, crop })
      } else if (this.cdn.toLowerCase() === 'shopify') {
        return this.shopifyResize({ src, width, height, crop })
      }
    },
    reformatImage({ src = null, format = 'auto' } = {}) {
      if (this.cdn.toLowerCase() === 'shopify') {
        return format === 'auto'
          ? this.shopifyReformat({ src })
          : this.shopifyReformat({ src, format })
      } else if (this.cdn.toLowerCase() === 'cloudinary') {
        return this.cloudinaryReformat({ src, format })
      }
      return null
    },
    shopifyResize({ src = null, width = null, height = null, crop = false } = {}) {
      // Request size which closely matches the width of the bounding element,
      // unless the parent container uses absolute positioning.
      // Round up size to the nearest 50px increment.
      const getSizeString = () => {
        if (width && height) {
          return `_${width}x${height}`
        } else if (width && !height) {
          return crop ? `_${width}x${this.roundedUpToNearest50px((width / 3) * 4)}` : `_${width}x`
        } else if (!width && height) {
          return `_x${height}`
        } else {
          return ''
        }
      }
      if (typeof src === 'string') {
        const [baseWithExt, args] = src.split('?')
        const [extension] = Array.from(baseWithExt.split('.')).reverse()
        const [base] = baseWithExt.split(`.${extension}`)
        const newSizeString = getSizeString()
        const cropString = crop ? `_crop_${this.cropDirection}` : ''
        const newBase = base.concat(newSizeString, cropString)
        const newArgs = args
          ? args.split('&').filter(el => el.includes('width=') === false)
          : null
        const newSrc = newBase.concat(`.${extension}?${newArgs.join('&')}`)
        return newSrc
      }
      return null
    },
    shopifyReformat({ src = null, format = 'webp' } = {}) {
      // Takes either a png or jpg (other formats will not work),
      // Returns query string for image in WebP or PJPG format.
      // NOTE: Transformation only works on png and jpg images.
      //
      // Example 1:
      //  shopifyReformat({ src: "https://cdn.shopify.com/s/files/myPicture.png", format: 'pjpg'})
      //  returns: "https://cdn.shopify.com/s/files/myPicture.png&format=pjpg"
      // Example 2:
      //  shopifyReformat({ src: "https://cdn.shopify.com/s/files/myPicture.jpg", format: 'webp'})
      //  returns: "https://cdn.shopify.com/s/files/myPicture.jpg&format=webp"
      //
      if (typeof src === 'string') {
        const extension = Array.from(src.split('?v=')[0].split('.')).pop()
        if (extension === 'png' || extension === 'jpg') {
          return src
            .split('&format=')[0]
            .concat(`&format=${format === 'auto' ? 'jpg' : format}`)
        } else {
          // return the original image if it is a gif / not a png or jpg
          return src
        }
      } else {
        return null
      }
    },
    cloudinaryResize({ src = null, width = null, height = null, crop = false } = {}) {
      // Request size which closely matches the width of the bounding element,
      // unless the parent container uses absolute positioning.
      // Round up size to the nearest 50px increment.
      const getSizeString = () => {
        if (width && height) {
          return `w_${width},h_${height}`
        } else if (width && !height) {
          return crop ? `w_${width},h_${this.roundedUpToNearest50px((width / 3) * 4)}` : `w_${width}`
        } else if (!width && height) {
          return `h_${height}`
        } else {
          return ''
        }
      }
      const getCropString = () => {
        if (crop) {
          if (this.cropDirection === 'center') {
            return ',c_lfill,g_center'
          }
          return ''
        }
        return ''
      }
      if (typeof src === 'string') {
        const sizeString = getSizeString()
        const cropString = getCropString()
        return src
          .split('fetch/')
          .reduce((acc, el, idx) => idx === 0 ? acc.concat(el, `fetch/${sizeString}${cropString}/`) : acc.concat(el), '')
      }
      return null
    },
    cloudinaryReformat({ src = null, format = 'auto', api = 'fetch' } = {}) {
      // Perform an on-the-fly image format transformation. Choose between
      // Cloudinary's 'fetch' and 'upload' APIs
      //
      if (typeof src === 'string') {
        const transformFormat = `f_${format}`
        const pathChar = src.split(`${api}/`)[1].split('/')[0].includes('_') ? ',' : '/'
        if (format === 'auto' || format === 'webp' || format === 'jpg' || format === 'png') {
          return src.split(`${api}/`)
            .reduce((acc, el, idx) => idx === 0
              ? acc.concat(el, api, '/', transformFormat, pathChar)
              : acc.concat(el), '')
        } else if (format === 'pjpg') {
          return src.split(`${api}/`)
            .reduce((acc, el, idx) => idx === 0
              ? acc.concat(el, api, '/', 'f_jpg,fl_progressive', pathChar)
              : acc.concat(el), '')
        } else {
          // return the original image if not being converted to a possible extension
          return src
        }
      }
      return null
    },
    shopifyToCloudinary({ url, api = 'fetch' } = {}) {
      if (api === 'fetch') {
        return typeof (url) === 'string'
          ? `${this.cloudinaryUrlBase}${url.split('&')[0]}`
          : url
      } else if (api === 'upload') {
        return typeof (url) === 'string'
          ? `${this.cloudinaryUrlBase}${url.split(this.shopifyPathPrefix)[1].split('&')[0]}`
          : url
      }
    },
    fromCloudinaryCDN({ url = null } = {}) {
      if (typeof url === 'string') {
        return url.split('.com')[0] === 'https://res.cloudinary'
      }
    },
    fromShopifyCDN({ url = null } = {}) {
      if (typeof url === 'string') {
        return url.split('.com')[0] === 'https://cdn.shopify'
      }
      return false
    },
    fromMagentoCDN({ url = null } = {}) {
      // Note that not all Magento stores use images from the Magento CDN
      if (typeof url === 'string') {
        const [, str1, str2, str3] = url.split('://')[1].split('/')
        return str1.concat('/', str2, '/', str3) === 'media/catalog/product'
      }
      return false
    }
  }
}
