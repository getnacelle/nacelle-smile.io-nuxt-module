import { withInfo } from 'storybook-addon-vue-info';

import ProductDescription from '../nacelle/ProductDescription';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const Description = () => ({
  components: { ProductDescription },
  template: '<product-description/>',
});

Description.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
