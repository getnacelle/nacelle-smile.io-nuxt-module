import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import MainNavBurger from '../nacelle/MainNavBurger';

export default {
  title: 'Components | Main Nav',

  decorators: [
    withInfo,
    () => {
      return {
        template: '<div style="padding: 3rem;"><story/></div>',
      };
    },
  ],
};

export const Burger = () => ({
  store,
  components: { MainNavBurger },
  template: `
    <main-nav-burger />
  `,
});

Burger.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
