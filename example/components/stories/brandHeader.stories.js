import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import brandHeader from '../nacelle/BrandHeader';

export default {
  title: 'Components | General',
  decorators: [withInfo, StoryRouter()],
};

export const HeaderAlignLeft = () => ({
  store,
  components: { brandHeader },
  data() {
    return {
      logoSrc: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png',
      links: [
        { path: '/link1', title: 'Link 1' },
        { path: '/link2', title: 'Link 2' },
        { path: '/link3', title: 'Link 3' },
      ],
      logoAlign: 'left',
      logoColumnWidth: 'is-2',
      icons: [
        {
          iconName: 'account',
          path: '/account',
        },
        {
          iconName: 'wishlist',
          path: '/wishlist',
        },
        {
          iconName: 'cart',
          iconMethod: 'cart/showCart',
          iconMethodType: 'mutation',
        },
      ],
    };
  },
  template: `
  <div class="container">
  <brand-header :logoSrc="logoSrc" :links="links" :logoAlign="logoAlign" :logoColumnWidth="logoColumnWidth" :icons="icons"/>
  </div>`,
});

HeaderAlignLeft.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
