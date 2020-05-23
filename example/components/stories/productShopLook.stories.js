import { withInfo } from 'storybook-addon-vue-info';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';
import { defaultProduct } from '../../tests/mocks/defaultObjects';
import ProductShopLook from '../nacelle/ProductShopLook';

export default {
  title: 'Components | Product ',

  decorators: [
    withInfo,
    withKnobs,
    StoryRouter(),
    () => {
      return {
        template: '<div style="padding: 3rem; max-width: 600px; margin: 0 auto;"><story/></div>',
      };
    },
  ],
};

export const ShopLook = () => ({
  components: { ProductShopLook },
  store,
  data() {
    return {
      image: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg',
      products: [defaultProduct],
    };
  },
  template: `
    <product-shop-look
      :image-src="image"
      :products="products"
    />
  `,
});

ShopLook.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
