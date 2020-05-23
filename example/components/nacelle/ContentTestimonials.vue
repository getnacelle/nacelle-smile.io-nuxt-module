<template>
  <section class="testimonials section nacelle">
    <div class="container">
      <component
        v-if="title.length > 0"
        :is="titleTag"
        class="title has-text-centered"
      >
        {{ title }}
      </component>
      <div class="glide-wrapper" v-if="slides.length > 0">
        <vue-glide :type="'carousel'" :perView="slidesPerView">
          <vue-glide-slide v-for="(slide, index) in slides" :key="index">
            <div class="glide__slide-inner">
              <content-testimonial
                :alignment="alignment"
                :name="slide.name"
                :quote="slide.quote"
                :imageUrl="slide.imageUrl"
              />
            </div>
          </vue-glide-slide>
          <template slot="control">
            <button class="glide-arrow glide-arrow-prev" data-glide-dir="<">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 768 768"
              >
                <path
                  d="M493.5 531l-45 45-192-192 192-192 45 45-147 147z"
                ></path>
              </svg>
              <span class="is-sr-only">
                prev
              </span>
            </button>
            <button class="glide-arrow glide-arrow-next" data-glide-dir=">">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 768 768"
              >
                <path
                  d="M274.5 531l147-147-147-147 45-45 192 192-192 192z"
                ></path>
              </svg>
              <span class="is-sr-only">
                next
              </span>
            </button>
          </template>
        </vue-glide>
      </div>
    </div>
  </section>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import ContentTestimonial from '~/components/nacelle/ContentTestimonial'

export default {
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    ContentTestimonial
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    slides: {
      type: Array,
      default: () => {
        return []
      }
    },
    slidesPerView: {
      type: Number,
      default: 1
    },
    alignment: {
      type: String,
      default: 'left'
    },
    titleTag: {
      type: String,
      default: 'h3'
    }
  }
}
</script>

<style lang="scss" scoped>
.glide-wrapper {
  margin-left: 2rem;
  margin-right: 2rem;
}

.glide__slide-inner {
  width: 100%;
}

.glide-arrow {
  position: absolute;
  top: calc(50% - 0.75rem);
  padding: 5px;
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;

  &.glide-arrow-prev {
    left: -1rem;
  }

  &.glide-arrow-next {
    right: -1rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
