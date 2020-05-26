import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import CartFlyout from '../nacelle/CartFlyout';
import CartFlyoutItem from '../nacelle/CartFlyoutItem';

export default {
  title: 'Components | Cart',
  decorators: [withInfo, StoryRouter()],
};

export const Flyout = () => ({
  store,
  components: { CartFlyout, CartFlyoutItem },
  mounted() {
    store.commit('cart/setFreeShippingThreshold', 100);
    store.dispatch('cart/updateLocalCart');
    store.commit('cart/showCart');
    // store.commit('cart/setLineItems', [])
    store.dispatch('cart/addLineItem', {
      image: {
        thumbnailSrc: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
      },
      title: 'Gray T-Shirt',
      productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
      handle: 'gray-t-shirt',

      quantity: 1,
      variant: {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDIyMDAwOQ==',
        title: 'Cool Version',
        price: '29.99',
      },
    });

    // store.dispatch('cart/addLineItem', {
    //   image: {
    //     source:
    //       'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
    //   },
    //   title: 'Black T-Shirt',
    //   productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4djE3Mzc=',
    //   handle: 'black-t-shirt',
    //   price: '29.99',
    //   quantity: 1,
    //   variant: {
    //     id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDIyMDAwOQ=='
    //   }
    // })
    // store.dispatch('cart/addLineItem', {
    //   image: {
    //     source:
    //       'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
    //   },
    //   title: 'Brown T-Shirt',
    //   productId: 'Z2lkOi8vc2hvcGlmeS9QcmzkdWN0LzM1OTkyMDE4djE3Mzc=',
    //   handle: 'brown-t-shirt',
    //   price: '29.99',
    //   quantity: 1,
    //   variant: {
    //     id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDUxNakyMQ=='
    //   }
    // })
    store.dispatch('cart/addLineItem', {
      image: {
        source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
      },
      title: 'Brown T-Shirt',
      productId: 'Z2lkOi8vc2hvcGlmeS9QcmzkdWN0LzM1OzkyMDE4djE3Mzc=',
      handle: 'brown-t-shirt',

      quantity: 1,
      variant: {
        price: '29.99',
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDE4NzI0MQ==',
      },
    });
  },
  template: `
  <cart-flyout>
    <template v-slot="item">
    <cart-flyout-item :item="item"/>
    </template>
  </cart-flyout>
  `,
});

Flyout.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
