import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import ProductImage from '../nacelle/ProductImage';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const Image = () => ({
  store,
  components: { ProductImage },
  template: `<div class="columns">
    <div class="column is-6">
      <product-image :width="500"/>
    </div>
  </div>`,
});

Image.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
