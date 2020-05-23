<template>
  <div
    :class="[swatchStyle, availableClass, swatchNameClass]"
    class="option-swatch nacelle no-select"
    @click="emitValue"
  >
    <div
      v-if="swatchStyle == 'bubble'"
      :class="swatchClass"
      :style="swatchBg"
      class="inside-color"
    />
    <span v-if="swatchStyle != 'bubble'">{{value}}</span>
  </div>
</template>

<script>
import flattenDeep from 'lodash.flattendeep'
export default {
  props: {
    value: {
      type: String
    },
    optionName: {
      type: String
    },
    swatchStyle: {
      type: String
    },
    swatchSrc: {
      type: String
    },
    selected: {
      type: Boolean
    },
    variants: {
      type: Array
    },
    selectedOptions: {
      type: Array
    }
  },
  methods: {
    emitValue() {
      if (this.optionAvailable) {
        this.$emit('swatchValue', this.value)
      }
    }
  },
  computed: {
    swatchClass() {
      if (this.value && this.optionName == 'Color') {
        const color = String(this.value)
        return `swatch-color-${color.toLowerCase()}`
      }

      return ''
    },
    swatchBg() {
      if (this.swatchSrc) {
        return {
          background: `url(${this.swatchSrc})`
        }
      }

      return null
    },
    variantsWithOptionValue() {
      if (this.variants) {
        let vm = this
        return this.variants.filter(variant => {
          if (
            variant.selectedOptions.filter(option => {
              return option.value == vm.value
            }).length > 0 &&
            variant.availableForSale
          ) {
            return true
          } else {
            return false
          }
        })
      }
    },

    optionAvailable() {
      let vm = this
      if (
        vm.variantsWithOptionValue &&
        vm.variantsWithOptionValue.length == 1 &&
        vm.selectedOptions.length > 0
      ) {
        let matches = flattenDeep(
          vm.variantsWithOptionValue[0].selectedOptions.map(option => {
            if (option.name != vm.optionName) {
              return vm.selectedOptions.map(selectedOption => {
                if (selectedOption.name == option.name) {
                  if (selectedOption.value == option.value) {
                    return true
                  } else {
                    return false
                  }
                }
              })
            }
          })
        )
        if (matches.includes(false)) {
          return false
        } else {
          return this.variantsWithOptionValue[0].availableForSale
        }
        // this is the last piece. for the variant that remains, determine whether or not its options are selected
        //
      } else if (
        vm.variantsWithOptionValue &&
        vm.variantsWithOptionValue.length == 1 &&
        vm.selectedOptions.length == 0
      ) {
        return true
      } else if (
        vm.variantsWithOptionValue &&
        this.variantsWithOptionValue.length > 1
      ) {
        // return this.variantsWithOptionValue.filter(variant =>{
        //   if(vm.selectedOptions.filter(option=>{
        //     if(option.name )
        //   }))
        // })
        return true
      } else {
        return false

        // IF MULTIPLE DIMENSIONS ////////////////////////////////
        // let variantsWithThisOptionValue = this.variants.filter(variant => {
        //   if (
        //     variant.selectedOptions.filter(option => {
        //       return option.value == vm.value
        //     }).length > 0
        //   ) {
        //     return true
        //   } else {
        //     return false
        //   }
        // })
        // if (variantsWithThisOptionValue.length == 1) {
        //   return variantsWithThisOptionValue[0].availableForSale
        // } else if (variantsWithThisOptionValue.length > 1) {
        //   return true
        // } else {
        //   return false
        // }

        // if (variants.length == 1) {
        //   return variants[0].availableForSale
        // } else {
        //   let availableVariants = variants.filter(variant => {
        //     return variant.availableForSale == true
        //   })

        //   if (availableVariants.length > 0 && vm.selectedOptions.length > 0) {
        //     let variantsWithThisOption = vm.selectedOptions.filter(option => {
        //       return option.value == vm.value
        //     })
        //     console.log(variantsWithThisOption)
        //     if (variantsWithThisOption.length > 0) {
        //       return true
        //     } else {
        //       return variantsWithThisOption[0].availableForSale
        //     }
        //   } else if (availableVariants.length > 0) {
        //     return true
        //   } else {
        //     return false
        //   }
        // }
      }
    },
    availableClass() {
      if (this.optionAvailable) {
        return 'available'
      } else {
        return 'not-available'
      }
    },
    swatchNameClass() {
      if (this.optionName) {
        let formattedOptionName = this.optionName.replace(' ', '-')
        return `swatch-${this.optionName}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bubble,
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
  &:first-child {
    margin-left: unset;
  }
  margin-bottom: 1rem;
}

.bubble {
  width: 2rem;
  height: 2rem;
  border: 1px solid #cecece;
  border-radius: 2rem;
  .inside-color {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
  }
}
.not-available {
  .inside-color {
    opacity: 0.5;
  }
}

.bubble.selected {
  transition: border 0.1s ease;
  border: 2px solid #a9a8a8;
}

.tab {
  transition: background-color 0.2s ease;
  border: 1px solid #a9a8a8;
  border-radius: 2px;
  padding: 0 0.5rem;
  height: 2rem;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9pt;
  text-transform: uppercase;
}

.tab.selected {
  background-color: #a9a8a8;
  color: white;
  font-weight: bold;
}

.swatch-color-red {
  background-color: rgb(148, 20, 20);
}

.swatch-color-blue {
  background-color: rgb(0, 68, 68);
}

.not-available {
  text-decoration: line-through;
  border: 1px dashed rgb(219, 219, 219);
  color: rgb(219, 219, 219);
  cursor: not-allowed;
}
</style>
