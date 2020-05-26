import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import ContentProductGrid from '../nacelle/ContentProductGrid'

import store from '../../.storybook/store'

import { defaultProduct } from '../../tests/mocks/defaultObjects'

const productArray = [defaultProduct, defaultProduct, defaultProduct]

export default {
  title: 'Components | Content / Product Grid',

  decorators: [withInfo, StoryRouter(), () => {
      return {
        template: `
          <div style="padding: 3rem;"><story/></div>
        `
      }
    }],
};

export const Default = () => ({
  components: { ContentProductGrid },
  store,
  data() {
    return {
      title: 'Product Grid',
      products: productArray
    }
  },
  template: '<content-product-grid :title="title" :products="products" />'
});

Default.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const CustomSlots = () => ({
  components: { ContentProductGrid },
  store,
  data() {
    return {
      title: 'Product Grid',
      products: productArray
    }
  },
  template: `
    <content-product-grid :title="title" :products="products">
      <template v-slot:header>
        <h1 style="font-size: 3em; margin-bottom: 1em">Custom Header</h1>
      </template>
      <template v-slot:products="{ products }">
        <ul>
          <li v-for="product in products" :key="product.id">
            {{ product.title }}
          </li>
        </ul>
      </template>
    </content-product-grid>
  `
});

CustomSlots.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
