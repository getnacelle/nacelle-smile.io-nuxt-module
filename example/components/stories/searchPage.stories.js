/**
 * Disabled until we can correctly use webworkers in Storybook
 *
 *
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { withActions } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';
import SearchBox from '../nacelle/SearchBox';
import RefinementFilters from '../nacelle/RefinementFilters';
import SearchResults from '../nacelle/SearchResults';
import SearchNoResults from '../nacelle/SearchNoResults';
import ProductGrid from '../nacelle/ProductGrid';
import searchResults from '../../tests/mocks/search-results';

const defaultFilters = [
  {
    field: 'productType',
    label: 'Product Type',
  },
];

export default {
  title: 'Components | Search',

  decorators: [
    withInfo,
    withKnobs,
    StoryRouter(),
    withActions(),
    () => ({
      template: `
        <div style="max-width: 1200px; margin: 3rem auto;"><story/></div>
      `,
    }),
  ],
};

export const Composition = () => ({
  store,
  components: {
    SearchBox,
    RefinementFilters,
    SearchResults,
    SearchNoResults,
    ProductGrid,
  },
  props: {
    filters: {
      type: Array,
      default: object('Filters Object', defaultFilters),
    },
  },
  data() {
    return {
      filteredData: [],
    };
  },
  computed: {
    products() {
      return this.$store.getters['search/productData'];
    },
    query() {
      return this.$store.state.search.query;
    },
  },
  created() {
    const mock = new MockAdapter(axios);

    mock.onGet('/data/search.json').reply(200, searchResults);

    this.$store.dispatch('search/getProductData');
  },
  methods: {
    onUpdate(outputData) {
      this.filteredData = outputData;
    },
  },
  template: `
    <div>
      <div class="columns is-centered">
        <div class="column is-3">
          <search-box position="in-page" />
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <refinement-filters
            :input-data="products"
            :filter-properties="filters"
            v-on:updated="onUpdate"
          />
        </div>
        <div class="column is-9">
          <search-results
            v-if="filteredData"
            :searchData="filteredData"
            :searchQuery="query"
          >
            <template v-slot:result="{ result }">
              <product-grid :products="result" :columns="2" />
            </template>
            <template v-slot:no-results>
              <search-no-results />
            </template>
          </search-results>
        </div>
      </div>
    </div>
  `,
});

Composition.story = {
  parameters: {
    info: {
      summary: `
      This is a complete example of all search components.
      `,
    },
  },
};
*/
