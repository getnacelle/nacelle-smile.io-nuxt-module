import { withInfo } from 'storybook-addon-vue-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import store from '../../.storybook/store';

import ProductVariantDropdown from '../nacelle/ProductVariantDropdown';
import CartFlyout from '../nacelle/CartFlyout';
import CartFlyoutItem from '../nacelle/CartFlyoutItem';

import defaultMultivariate from '../../tests/mocks/multivariateProduct';

export default {
  title: 'Components | Product',
  decorators: [withInfo, withKnobs],
};

export const VariantDropdown = () => ({
  components: {
    ProductVariantDropdown,
    CartFlyout,
    CartFlyoutItem,
  },
  store,
  props: {
    showAtc: {
      default: boolean('Show Add to Cart', true),
    },
  },
  data() {
    return {
      product: defaultMultivariate,
      variant: defaultMultivariate.variants[0],
    };
  },
  methods: {
    onVariantSelect({ selectedVariant }) {
      console.log(selectedVariant);
      this.variant = selectedVariant;
    },
  },
  template: `
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-4-desktop is-8-tablet">
        <product-variant-dropdown
          :product="product"
          :variant="variant"
          :show-add-to-cart="showAtc"
          v-on:variant-selected="onVariantSelect"
        />
      </div>
    </div>
  </section>`,
});

VariantDropdown.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
