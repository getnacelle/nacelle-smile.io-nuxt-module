import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import store from '../../.storybook/store'
import ProductCard from '../nacelle/ProductCard'
import { defaultProduct } from '../../tests/mocks/defaultObjects'

export default {
  title: 'Components | Product / Product Card',

  decorators: [withInfo, StoryRouter(), () => {
      return {
        template: `
          <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
        `
      }
    }],
};

export const Default = () => ({
  components: { ProductCard },
  store,
  template: '<product-card />'
});

Default.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const WithSampleData = () => ({
  store,
  components: { ProductCard },
  data() {
    return {
      product: defaultProduct,
      variant: defaultProduct.variants[0]
    }
  },
  template: '<product-card :product="product" :variant="variant"/>'
});

WithSampleData.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
