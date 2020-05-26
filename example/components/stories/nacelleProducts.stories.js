import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import NacelleProducts from '../nacelle/NacelleProducts';

export default {
  title: 'Components | Nacelle Data',
  decorators: [withInfo, StoryRouter()],
};

export const Products = () => ({
  store,
  components: { NacelleProducts },
  template: `
    <div>
      <h3>Fetch One Product</h3>
      <nacelle-products :handle="'test 1'">
        <template v-slot:default="{ product }">
          <pre>{{ product }}</pre>
        </template>
      </nacelle-products>
      <h3>Fetch Array of Products</h3>
      <nacelle-products :handles="['test 1','test 2']">
        <template v-slot:default="{ products }">
          <pre>{{ products }}</pre>
        </template>
      </nacelle-products>
    </div>
  `,
});

Products.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
