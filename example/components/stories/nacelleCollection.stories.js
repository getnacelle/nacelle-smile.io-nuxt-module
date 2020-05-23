import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../../.storybook/store'

import NacelleCollection from '../nacelle/NacelleCollection'

export default {
  title: 'Components | Nacelle Data / Collection',
  decorators: [withInfo, withKnobs, StoryRouter()],
};

export const NoPagination = () => ({
  store,
  components: { NacelleCollection },
  template: `
    <div>
      <nacelle-collection :handle="'test 1'">
        <template v-slot:default="{ collection, products }">
          <h3>The collection</h3>
          <pre>{{ collection }}</pre>
          <h3>Products in the collection</h3>
          <pre>{{ products }}</pre>
        </template>
      </nacelle-collection>
    </div>
  `
});

NoPagination.story = {
  name: 'No Pagination',

  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const Pagination = () => ({
  store,
  components: { NacelleCollection },
  props: {
    productsPerPage: {
      default: number('Products per Page', 1)
    },
    buttonText: {
      default: text('Button Text', 'Load More')
    },
    buttonLoadMore: {
      default: boolean('Use Button Load More', true)
    }
  },
  template: `
    <div>
      <nacelle-collection
        :handle="'test 1'"
        :paginate="true"
        :products-per-page="productsPerPage"
        :use-button-load-more="buttonLoadMore"
        :button-text="buttonText"
      >
        <template v-slot:default="{ collection, products }">
          <h3>The collection</h3>
          <pre>{{ collection }}</pre>
          <h3>Products in the collection</h3>
          <div v-for="product in products">
            <pre>{{ product }}</pre>
          </div>
        </template>
      </nacelle-collection>
    </div>
  `
});

Pagination.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
