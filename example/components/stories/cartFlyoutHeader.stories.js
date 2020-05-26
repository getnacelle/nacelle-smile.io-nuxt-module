import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import CartFlyoutHeader from '../nacelle/CartFlyoutHeader';

export default {
  title: 'Components | Cart',
  decorators: [withInfo],
};

export const FlyoutHeader = () => ({
  store,
  components: { CartFlyoutHeader },
  data() {
    return {};
  },
  template: '<cart-flyout-header/>',
});

FlyoutHeader.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
