<template>
  <div class="media-select-view columns is-multiline nacelle">
    <div class="media-viewer column is-12">
      <transition name="fade" mode="out-in">
        <component
          :is="mediaComponent"
          v-if="selectedMedia"
          :source="selectedMedia.src"
          :key="selectedMedia.src"
          :width="featuredMediaWidth"
          :observeVisibility="false"
          :fadeIn="fadeIn"
          ref="selected-media"
        />
      </transition>
    </div>
    <div class="media-select column is-12">
      <div class="columns is-mobile">
        <div v-for="item in media" :key="item.id" class="column is-one-fifth">
          <product-image
            class="media-item"
            @click.native="setSelected(item)"
            :source="item.thumbnailSrc"
            :observeVisibility="false"
          />
          <img v-show="null != null" :src="item.src" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from '~/components/nacelle/ProductImage'
import ProductVideo from '~/components/nacelle/ProductVideo'
export default {
  components: {
    ProductImage,
    ProductVideo
  },
  props: {
    media: {
      type: Array,
      required: true
    },
    featuredMedia: {
      type: Object,
      required: true
    },
    fadeIn: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selectedMedia: this.featuredMedia,
      loaded: true
    }
  },
  computed: {
    mediaComponent() {
      if (this.selectedMedia) {
        if (this.selectedMedia.type == 'image') {
          return 'ProductImage'
        } else if (this.selectedMedia.type == 'video') {
          return 'ProductVideo'
        }
      }
    },
    featuredMediaWidth() {
      if (this.selectedMedia && this.selectedMedia.width) {
        return this.selectedMedia.width
      }

      return null
    }
  },
  methods: {
    setSelected(item) {
      const mediaViewer = this.$el.querySelector('.media-viewer')
      mediaViewer.style.height = `${mediaViewer.offsetHeight}px`
      this.loaded = false
      this.selectedMedia = item
    },
    afterEnter() {
      const mediaViewer = this.$el.querySelector('.media-viewer')
      mediaViewer.style.height = null
    }
  }
}
</script>

<style lang="scss" scoped>
.media-viewer {
  margin-bottom: 2rem;
}

.media-item {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
