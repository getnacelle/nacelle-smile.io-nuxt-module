import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import CartFlyoutCheckoutButton from '../nacelle/CartFlyoutCheckoutButton';

export default {
  title: 'Components | Cart',
  decorators: [withInfo],
};

export const FlyoutCheckoutButton = () => ({
  store,
  components: { CartFlyoutCheckoutButton },
  data() {
    return {};
  },
  template: '<cart-flyout-checkout-button/>',
});

FlyoutCheckoutButton.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
