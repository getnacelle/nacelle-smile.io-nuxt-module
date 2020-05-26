<template>
  <div class="featured-media nacelle">
    <figure v-if="source && type.includes('image')">
      <picture>
        <source :srcset="optimizeSource({ url: media.src })" />
        <source :srcset="optimizeSource({ url: media.src, format: 'webp' })" type="image/webp" />
        <source :srcset="optimizeSource({ url: media.src, format: 'jpg' })" type="image/jpg" />
        <img :src="media.src" />
      </picture>
    </figure>
    <video v-if="source && type.includes('video')">
      <source :src="media.src" :type="type" />
    </video>
  </div>
</template>

<script>
import imageOptimize from '~/mixins/imageOptimize'
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number
    }
  },
  computed: {
    source() {
      if (this.media && this.media.src) {
        return this.media.src
      }

      return null
    },
    type() {
      if (this.media && this.media.type) {
        return this.media.type
      }

      return 'image'
    }
  },
  mixins: [imageOptimize]
}
</script>

<style>
</style>
