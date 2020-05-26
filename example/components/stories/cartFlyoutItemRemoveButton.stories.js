import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import CartFlyoutItemRemoveButton from '../nacelle/CartFlyoutItemRemoveButton';

export default {
  title: 'Components | Cart',
  decorators: [withInfo],
};

export const RemoveButton = () => ({
  store,
  components: { CartFlyoutItemRemoveButton },
  data() {
    return {
      id:
        'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::106d9dd5-44ec-4b0b-b558-0c42657bf812',
    };
  },
  template: '<cart-flyout-item-remove-button :lineId="id"/>',
});

RemoveButton.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
