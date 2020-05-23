<template>
  <div class="swatches columns is-marginless is-multiline nacelle">
    <product-option-swatch
      v-on:swatchValue="setOptionValue"
      v-for="value in option.values"
      :value="value.value"
      :swatchSrc="value.swatchSrc"
      :key="value.value"
      :optionName="option.name"
      :swatchStyle="swatchStyle"
      :class="{selected: value.value == selectedOptionValue}"
      :variants="variants"
      :selectedOptions="selectedOptions"
    />
  </div>
</template>

<script>
import ProductOptionSwatch from '~/components/nacelle/ProductOptionSwatch'
export default {
  props: {
    option: {
      type: Object
    },
    variants: {
      type: Array
    },
    selectedOptions: {
      type: Array
    },
    clearOptionValue: {
      type: Boolean
    }
  },
  components: {
    ProductOptionSwatch
  },
  data() {
    return {
      selectedOptionValue: null
    }
  },
  computed: {
    swatchStyle() {
      switch (this.option.name) {
        case 'Color':
          return 'bubble'
        default:
          return 'tab'
      }
    }
  },
  watch: {
    selectedOptionValue(newVal) {
      if (newVal != null) {
        this.$emit('optionSet', { name: this.option.name, value: newVal })
      }
    },
    clearOptionValue(newVal) {
      if (newVal == true) {
        this.selectedOptionValue = null
        this.$emit('clearedOptionValue')
      }
    }
  },
  methods: {
    setOptionValue(value) {
      this.selectedOptionValue = value
    }
  },
  created() {
    if (this.option.values.length == 1) {
      this.setOptionValue(this.option.values[0].value)
    }
  }
}
</script>

<style lang="scss" scoped>
.option {
  margin-bottom: 1rem;
}
.swatches {
  display: flex;
  flex-wrap: wrap;
}
</style>
