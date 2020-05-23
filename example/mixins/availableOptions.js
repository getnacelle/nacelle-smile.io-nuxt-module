import flattenDeep from 'lodash.flattendeep'
import uniq from 'lodash.uniq'
import uniqWith from 'lodash.uniqwith'
import isEqual from 'lodash.isequal'

export default {
  computed: {
    allOptions() {
      if (this.product.variants) {
        const nestedOptions = this.product.variants.map(variant => {
          if (variant.selectedOptions) {
            return variant.selectedOptions.map(option => {
              if (option.name === 'Color') {
                return {
                  name: option.name,
                  value: option.value,
                  swatchSrc: variant.swatchSrc
                }
              }

              return option
            })
          }

          return []
        })
        const flattenedOptions = flattenDeep(nestedOptions)

        const optionNames = uniq(
          flattenedOptions.map(option => {
            return option.name
          })
        )
        const optionValuesByName = optionNames.map(name => {
          const values = uniqWith(
            flattenedOptions
              .filter(option => {
                if (option.name === name) {
                  return option
                }
              })
              .map(option => {
                if (option.swatchSrc) {
                  return { value: option.value, swatchSrc: option.swatchSrc }
                } else {
                  return { value: option.value }
                }
              }),
            isEqual
          )

          return {
            name,
            values
          }
        })

        return optionValuesByName
      }
    },
    applicableOptions() {
      const vm = this
      const uniqueFlattenedOptions = uniq(
        flattenDeep(
          vm.selectedOptions.map(option => {
            return vm.product.variants.map(variant => {
              return variant.selectedOptions.map(selectedOption => {
                if (selectedOption.__typename) {
                  delete selectedOption.__typename
                }
                if (JSON.stringify(option) === JSON.stringify(selectedOption)) {
                  return variant.selectedOptions
                }
              })
            })
          })
        )
      ).filter(option => {
        return option !== undefined
      })

      return uniqueFlattenedOptions
    },
    // selectableOptions() {
    //   let vm = this
    //   return vm.allOptions.map(option => {
    //     let values = option.values.map(value => {
    //       return vm.applicableOptions.map(applicableOption => {
    //         if (option.name == applicableOption.name) {
    //           if (value == applicableOption.value) {
    //             return { value, selectable: true }
    //           } else {
    //             return { value, selectable: false }
    //           }
    //         }
    //       })
    //     })
    //     return {
    //       name: option.name,
    //       values
    //     }
    //   })
    // },
    selectedVariant() {
      const vm = this
      if (vm.selectedOptions) {
        return this.product.variants.filter(variant => {
          const results = []
          vm.selectedOptions.forEach(option => {
            variant.selectedOptions.forEach(variantOption => {
              if (variantOption.__typename) {
                delete variantOption.__typename
              }
              if (JSON.stringify(option) === JSON.stringify(variantOption)) {
                results.push(true)
              }
            })
          })
          if (results.length === vm.selectedOptions.length) {
            return variant
          }
        })[0]
      }
    },
    onlyOneOption() {
      return (
        this.allOptions.length === 1 &&
        this.allOptions[0].values.length === 1
      )
    }
  }
}
