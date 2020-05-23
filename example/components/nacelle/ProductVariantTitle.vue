<template>
  <p
    v-if="title != 'Default Title'"
    class="variant-title nacelle"
  >{{title}}</p>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>
