import { withInfo } from 'storybook-addon-vue-info';

import ProductTitle from '../nacelle/ProductTitle';

import store from '../../.storybook/store';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const Title = () => ({
  store,
  components: { ProductTitle },
  template: '<product-title/>',
});

Title.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
