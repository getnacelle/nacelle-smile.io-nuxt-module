<template>
  <div></div>
</template>

<script>
import getUserData from '~/mixins/getUserData'
export default {
  mixins: [getUserData],
  mounted() {
    this.getUserData()
  }
}
</script>