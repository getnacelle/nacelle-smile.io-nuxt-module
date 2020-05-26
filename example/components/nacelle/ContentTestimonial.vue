<template>
  <div class="testimonial columns nacelle">
    <div v-if="hasImage" class="testimonial-image column is-paddingless">
      <figure class="image is-square">
        <img :src="imageUrl" :class="{ 'is-rounded' : roundedImage }" alt="" />
      </figure>
    </div>
    <div class="testimonial-copy column" :class="`has-text-${alignment}`">
      <blockquote class="testimonial-quote">
        {{ quote }}
      </blockquote>
      <p class="testimonial-name">
        <strong>
          {{ name }}
        </strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    quote: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    roundedImage: {
      type: Boolean,
      default: false
    },
    alignment: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    hasImage() {
      return this.imageUrl.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.testimonial {
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
}

.testimonial-image {
  flex-basis: 128px;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>

