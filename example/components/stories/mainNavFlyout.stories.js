import { withKnobs, button } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import MainNavFlyout from '../nacelle/MainNavFlyout';

const label = 'Toggle Menu';
const handler = () => {
  store.commit('menu/toggleShowMenu');
};

export default {
  title: 'Components | Main Nav',
  decorators: [withInfo, withKnobs, StoryRouter(),
    () => {
      return {
        template: `
          <div style="max-width: 450px; margin: 3rem auto; text-align: center"><story/></div>
        `,
      };
    },
  ],
};

export const _MainNavFlyout = () => ({
  store,
  components: { MainNavFlyout },
  template: `
    <div>
      <h3>Trigger with the Toggle Menu knob</h3>
      <main-nav-flyout>
        <template v-slot:flyout-menu>
          <router-link class="main-nav-item" :to="'/shop'">Shop</router-link>
        </template>
      </main-nav-flyout>
    </div>
  `,
  created() {
    button(label, handler);
  },
});

_MainNavFlyout.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
