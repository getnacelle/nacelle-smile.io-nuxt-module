<template>
  <label :for="id">
    <input
      v-on:change="$emit('change', value)"
      :id="id"
      :name="name"
      :value="value"
      :checked="preChecked"
      :aria-checked="currentlyChecked || preChecked"
      role="switch"
      type="radio"
      tabindex="0"
    />
    {{label}}
  </label>
</template>

<script>
export default {
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  computed: {
    currentlyChecked() {
      return this.$attrs.inputValue === this.value
    },
    preChecked() {
      return this.$attrs.inputValue === null && this.checked
    }
  },
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: String
    },
    label: {
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
