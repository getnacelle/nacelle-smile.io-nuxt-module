<template>
  <div
    class="product-image nacelle"
    ref="img-card"
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true
    }"
  >
    <picture>
      <source
        v-if="visibility && cloudinaryCanAutoFormat && validImage"
        :srcset="optimizeSource({ url: source, format: 'auto' })"
        v-on:loadend="onLoaded"
      />
      <source
        v-if="visibility && reformat && validImage"
        :srcset="optimizeSource({ url: source, format: 'webp' })"
        type="image/webp"
      />
      <source
        v-if="visibility && reformat && validImage"
        :srcset="optimizeSource({ url: source, format: 'jpg' })"
        type="image/jpeg"
      />
      <img
        v-if="visibility"
        v-on:loadend="onLoaded"
        v-bind:class="{ loaded }"
        ref="product-image"
        :src="source"
        :alt="alt"
        :width="width"
        :height="height"
        :style="cssVars"
        @error="fallback"
      />
      <img v-else-if="!visibility" :src="blankImage" />
    </picture>
  </div>
</template>

<script>
import imageOptimize from '~/mixins/imageOptimize'
import imageVisibility from '~/mixins/imageVisibility'

export default {
  props: {
    source: {
      type: String,
      default:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-product-image.svg'
    },
    alt: {
      type: String,
      default: 'Featured Product Image'
    },
    fadeIn: {
      type: Number,
      default: 0.3
    },
    containerRef: {
      type: String,
      default: 'img-card'
    }
  },
  computed: {
    cssVars() {
      return {
        '--fade-in-time': `${this.fadeIn}s`
      }
    },
    fallbackImage() {
      return this.source
    }
  },
  mixins: [imageOptimize, imageVisibility]
}
</script>

<style lang="scss" scoped>
.product-image,
img {
  width: 100%;
  .loaded {
    animation: fadein var(--fade-in-time);
    -moz-animation: fadein var(--fade-in-time); /* Firefox */
    -webkit-animation: fadein var(--fade-in-time); /* Safari and Chrome */
    -o-animation: fadein var(--fade-in-time); /* Opera */
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
