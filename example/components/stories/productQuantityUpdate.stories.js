import { withInfo } from 'storybook-addon-vue-info';
import QuantitySelector from '../nacelle/QuantitySelector';
import store from '../../.storybook/store';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const Quantity = () => ({
  store,
  components: { QuantitySelector },
  data() {
    return {
      quantity: 0,
    };
  },
  template: `
    <div class="section">
      <quantity-selector
        :quantity.sync="quantity"
      />
    </div>
  `,
  mounted() {},
});

Quantity.story = {
  parameters: {
    info: {
      summary: 'Increment or decrement quantity.',
    },
  },
};
