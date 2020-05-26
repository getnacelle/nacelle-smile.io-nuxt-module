<template>
  <component class="product-title nacelle" :is="element">{{title}}</component>
</template>

<script>
export default {
  props: {
    element: {
      type: String,
      default: 'h3'
    },
    title: {
      type: String,
      default: 'Product Title'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-title {
  font-size: 22pt;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
