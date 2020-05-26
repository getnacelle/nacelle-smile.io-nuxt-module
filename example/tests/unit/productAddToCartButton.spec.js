import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProductAddToCartButton from '@/components/nacelle/ProductAddToCartButton'
import createStoreConfig from '../storeConfig'
import Vuex from 'vuex'

describe('Product Add to Cart Button', () => {
  it('renders the button', async() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    const wrapper = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [
            {
              id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99',
              availableForSale: true
            }
          ],
          options: [
            {
              name: 'Size',
              values: ['xs', 's']
            }
          ]
        }
      }
    })
    expect(wrapper.findAll('button').exists()).toBe(true)
  })

  it('adds the item there is only one option/value', async() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    const wrapper = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        allOptionsSelected: true,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
          price: '29.99',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            }
          ]
        },
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [
            {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99',
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: 'Small'
                }
              ]
            }
          ],
          options: [
            {
              name: 'Size',
              values: ['Small']
            }
          ]
        }
      }
    })
    wrapper.find('button').trigger('click')
    expect(store.state.cart.lineItems.length).toBeGreaterThan(0)
  })

  it('displays "add to cart" when there is only one option', async() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    const wrapper = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        allOptionsSelected: true,
        onlyOneOption: true,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
          price: '29.99',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            }
          ]
        },
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [
            {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99',
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: 'Small'
                }
              ]
            }
          ],
          options: [
            {
              name: 'Size',
              values: ['Small']
            }
          ]
        }
      }
    })
    expect(wrapper.find('button').text()).toBe('Add to Cart')
  })

  it('displays "select options" even after item is added when there are multiple variants', async() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    const wrapper = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        allOptionsSelected: true,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
          price: '29.99',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            }
          ]
        },
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [
            {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99',
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: 'Small'
                }
              ]
            },
            {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQw52==',
              price: '34.99',
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: 'Medium'
                }
              ]
            }
          ],
          options: [
            {
              name: 'Size',
              values: ['Small', 'Medium']
            }
          ]
        }
      }
    })

    wrapper.find('button').trigger('click')

    expect(wrapper.find('button').text()).toBe('Select Options')
  })

  it('passes metafield props recieved from parent to cartLineItems', async() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)
    const wrapper = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        allOptionsSelected: true,
        metafields: [{ key: 'customProp1', value: 'customValue1' }],
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
          price: '29.99',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            }
          ]
        },
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          availableForSale: true,
          variants: [
            {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFadC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99',
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: 'Small'
                }
              ]
            }
          ],
          options: [
            {
              name: 'Size',
              values: ['Small']
            }
          ]
        }
      }
    })
    wrapper.find('button').trigger('click')

    expect(store.getters['cart/checkoutLineItems'][0].metafields).toEqual([
      { key: 'customProp1', value: 'customValue1' }

    ])
  })
})
