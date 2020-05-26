import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import CartFlyoutItem from '../nacelle/CartFlyoutItem';

export default {
  title: 'Components | Cart',
  decorators: [withInfo, StoryRouter()],
};

export const FlyoutItem = () => ({
  store,
  components: { CartFlyoutItem },
  data() {
    return {
      item: {
        id:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::106d9dd5-44ec-4b0b-b558-0c42657bf812',
        image: {
          thumbnailSrc: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        price: '29.99',
        quantity: 1,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
        },
      },
    };
  },
  template: `<div class="columns">
    <div class="column is-4">
        <cart-flyout-item :item="item"/>
    </div>
  </div>`,
});

FlyoutItem.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
