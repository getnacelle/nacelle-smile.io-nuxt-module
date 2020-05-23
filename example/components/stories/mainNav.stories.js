import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import MainNav from '../nacelle/MainNav';

export default {
  title: 'Components | Main Nav',
  decorators: [withInfo, StoryRouter()],
};

export const _MainNav = () => ({
  store,
  components: { MainNav },
  template: `
    <main-nav />
  `,
});

_MainNav.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
