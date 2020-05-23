import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import ProductAddToCartButton from '../nacelle/ProductAddToCartButton';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const AddToCartButton = () => ({
  store,
  components: { ProductAddToCartButton },
  data() {
    return {
      product: {
        availableForSale: false,
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
      },

      variant: {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
      },
    };
  },
  template: '<product-add-to-cart-button :product="product" :variant="variant"/>',
});

AddToCartButton.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
