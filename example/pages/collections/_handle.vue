<!--
/****
/* Product collections are loaded with the getCollection mixin.
/* For information about creating collections, please refer to:
/*
/* https://docs.getnacelle.com/nuxt/collections.html#adding-content-to-collections-pages
/****
-->
<template>
  <div class="page page-shop" v-if="collection">
    <content-hero-banner
      v-if="collection"
      :title="collection.title"
      :backgroundImgUrl="featuredImage"
    />
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <product-grid
            v-if="products && products.length > 0"
            :products="products"
            :showAddToCart="true"
            :showQuantityUpdate="true"
          />
        </div>
      </div>
      <observe-emitter v-on:observe="fetchMore" />
    </section>
  </div>
</template>

<script>
import getCollection from '~/mixins/getCollection'
import ContentHeroBanner from '~/components/nacelle/ContentHeroBanner'
import ProductGrid from '~/components/nacelle/ProductGrid'
import ObserveEmitter from '~/components/nacelle/ObserveEmitter'
import { mapGetters } from 'vuex'
export default {
  name: 'collection',
  components: {
    ContentHeroBanner, ProductGrid, ObserveEmitter
  },
  mixins: [getCollection()],
  computed: {
    productData() {
      if (this.products) {
        return this.products.map(product => {
          const { tags, variants, ...rest } = product

          /// //////////////////////////
          /// //////////////////////////
          // Get product filter facets from variant data
          const variantOptions = variants.map(variant => {
            return variant.selectedOptions
          })

          const variantFacets = variantOptions
            .reduce((acc, item) => {
              return acc.concat(item)
            }, [])
            .map(option => JSON.stringify(option))

          const facets = Array.from(new Set(variantFacets))
            .map(option => JSON.parse(option))
            .map(option => {
              return { name: option.name.toLowerCase(), value: option.value }
            })

          /// //////////////////////////
          /// //////////////////////////
          // Get product filter facets from tags. Tags should be formatted "filter_property-name_value"
          const rootFacets = tags.filter(tag => tag.includes('filter'))

          rootFacets.forEach(facet => {
            const facetFragments = facet.split('_')
            const facetName = facetFragments[1]
            const facetValue = () => {
              const fragments = facetFragments[2].split('-')
              return fragments
                .map(fragment => {
                  return `${fragment
                    .charAt(0)
                    .toUpperCase()}${fragment.substring(1)}`
                })
                .join(' ')
            }

            rest[facetName] = facetValue()
            facets.push({ name: facetName, value: facetValue() })
          })

          if (product.productType) {
            facets.push({ name: 'productType', value: product.productType })
          }

          rest.minPrice = rest.priceRange.min

          return { ...rest, tags, variantOptions, variants, facets }
        })
      }

      return []
    },
    ...mapGetters('space', ['getMetatag']),
    featuredImage() {
      if (
        this.collection &&
        this.collection.featuredMedia &&
        this.collection.featuredMedia.src
      ) {
        return this.collection.featuredMedia.src
      }

      return null
    }
  },
  head() {
    if (this.collection) {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')

      if (this.collection.title) {
        let fullTitle = this.collection.title

        if (title) {
          fullTitle = `${fullTitle} | ${title.value}`
        }

        properties.title = fullTitle
        meta.push({
          hid: 'og:title',
          property: 'og:title',
          content: fullTitle
        })
      }

      if (this.collection.description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: this.collection.description
        })
        meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: this.collection.description
        })
      }

      if (this.featuredImage) {
        meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: this.featuredImage
        })
      }

      return {
        ...properties,
        meta
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  .title {
    font-weight: bold;
  }
  img {
    width: 250px;
  }
}
</style>
