import { withInfo } from 'storybook-addon-vue-info';

import ProductPrice from '../nacelle/ProductPrice';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const Price = () => ({
  components: { ProductPrice },
  data() {
    return {
      price: '29.59',
    };
  },
  template: '<product-price :price="price" show-currency-code></product-price>',
});

Price.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
