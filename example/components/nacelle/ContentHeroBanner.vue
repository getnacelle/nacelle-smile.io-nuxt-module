<template>
  <section :class="bannerClasses">
    <slot
      name="background"
      :mobileBackgroundImgUrl="mobileBackgroundImgUrl"
      :backgroundImgUrl="backgroundImgUrl"
      :backgroundAltTag="backgroundAltTag"
    >
      <picture class="hero-background" ref="hero-img-card">
        <source
          v-if="cloudinaryCanAutoFormat"
          media="(max-width: 768px)"
          :srcset="
            optimizeSource({
              url: mobileSrc,
              format: 'auto',
              width: 768,
              crop: mobileCrop
            })
          "
          @error="fallback"
        />
        <source
          v-if="reformat"
          media="(max-width: 768px)"
          :srcset="
            optimizeSource({
              url: mobileSrc,
              format: 'webp',
              width: 768,
              crop: mobileCrop
            })
          "
          type="image/webp"
          @error="fallback"
        />
        <source
          v-if="reformat"
          media="(max-width: 768px)"
          :srcset="
            optimizeSource({
              url: mobileSrc,
              format: 'pjpg',
              width: 768,
              crop: mobileCrop
            })
          "
          type="image/jpeg"
          @error="fallback"
        />
        <source
          v-if="cloudinaryCanAutoFormat"
          media="(min-width: 769px) and (max-width: 1023px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'auto',
              width: 1023,
              crop: mobileCrop
            })
          "
          @error="fallback"
        />
        <source
          v-if="reformat"
          media="(min-width: 769px) and (max-width: 1023px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'webp',
              width: 1023,
              crop: mobileCrop
            })
          "
          type="image/webp"
        />
        <source
          v-if="reformat"
          media="(min-width: 769px) and (max-width: 1023px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'pjpg',
              width: 1023,
              crop: mobileCrop
            })
          "
          type="image/jpeg"
        />
        <source
          v-if="cloudinaryCanAutoFormat"
          media="(min-width: 1023px) and (max-width: 1215px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'auto',
              width: 1215
            })
          "
          @error="fallback"
        />
        <source
          v-if="reformat"
          media="(min-width: 1023px) and (max-width: 1215px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'webp',
              width: 1215
            })
          "
          type="image/webp"
        />
        <source
          v-if="reformat"
          media="(min-width: 1023px) and (max-width: 1215px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'pjpg',
              width: 1215
            })
          "
          type="image/jpeg"
        />
        <source
          v-if="cloudinaryCanAutoFormat"
          media="(min-width: 1216px) and (max-width: 1407px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'auto',
              width: 1407
            })
          "
          @error="fallback"
        />
        <source
          v-if="reformat"
          media="(min-width: 1216px) and (max-width: 1407px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'webp',
              width: 1407
            })
          "
          type="image/webp"
        />
        <source
          v-if="reformat"
          media="(min-width: 1216px) and (max-width: 1407px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'pjpg',
              width: 1407
            })
          "
          type="image/jpeg"
        />
        <source
          v-if="cloudinaryCanAutoFormat"
          media="(min-width: 1408px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'auto',
              width: 1408
            })
          "
          @error="fallback"
        />
        <source
          v-if="reformat"
          media="(min-width: 1408px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'webp',
              width: 1408
            })
          "
          type="image/webp"
        />
        <source
          v-if="reformat"
          media="(min-width: 1408px)"
          :srcset="
            optimizeSource({
              url: backgroundImgUrl,
              format: 'pjpg',
              width: 1408
            })
          "
          type="image/jpeg"
        />
        <img
          :src="backgroundImgUrl"
          :alt="backgroundAltTag"
          @error="fallback"
        />
      </picture>
    </slot>
    <div class="hero-body">
      <div class="container">
        <div class="hero-body-inner">
          <slot
            name="body"
            :textColor="textColor"
            :title="title"
            :subtitle="subtitle"
          >
            <h1
              class="title"
              :style="
                textColor && textColor.length > 0 ? `color: ${textColor}` : ''
              "
            >
              {{ title }}
            </h1>
            <h3
              class="subtitle"
              :style="
                textColor && textColor.length > 0 ? `color: ${textColor}` : ''
              "
            >
              {{ subtitle }}
            </h3>
          </slot>
          <slot
            name="cta"
            :ctaUrl="ctaUrl"
            :ctaText="ctaText"
            :ctaHandler="ctaHandler"
          >
            <p v-if="ctaText.length > 0">
              <cta-button :to="ctaUrl" @clicked="ctaHandler">{{
                ctaText
              }}</cta-button>
            </p>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CtaButton from '~/components/nacelle/CtaButton'
import imageOptimize from '~/mixins/imageOptimize'

export default {
  components: {
    CtaButton
  },
  props: {
    alignment: {
      type: String,
      default: 'center'
    },
    size: {
      type: String,
      default: 'medium'
    },
    mobileFullHeight: {
      type: Boolean,
      default: false
    },
    mobileCrop: {
      type: Boolean,
      default: true
    },
    backgroundImgUrl: {
      type: String,
      default: ''
    },
    mobileBackgroundImgUrl: {
      type: String,
      default: ''
    },
    backgroundAltTag: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    ctaText: {
      type: String,
      default: ''
    },
    ctaUrl: {
      type: String,
      default: ''
    },
    ctaHandler: {
      type: Function,
      default: () => {}
    },
    textColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageOptions: {
        url: this.backgroundImgUrl,
        containerRef: 'hero-img-card'
      }
    }
  },
  computed: {
    bannerClasses() {
      const mobileHeightClass = this.mobileFullHeight
        ? 'is-mobile-fullheight'
        : ''

      return `hero nacelle is-${this.size} is-align-${this.alignment} ${mobileHeightClass}`
    },
    mobileSrc() {
      return this.mobileBackgroundImgUrl || this.backgroundImgUrl
    },
    fallbackImage() {
      return this.backgroundImgUrl
    }
  },
  mixins: [imageOptimize]
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;

  &.is-mobile-fullheight {
    @media screen and (max-width: 768px) {
      height: 100vh;
    }
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.is-mobile-fullheight .hero-body {
  display: flex;
  align-items: center;
}

.is-align-center .hero-body .container {
  display: flex;
  justify-content: center;
  text-align: center;
}

.is-align-right .hero-body .container {
  display: flex;
  justify-content: flex-end;
  text-align: right;
}

.hero-body-inner {
  max-width: 650px;
}
</style>
