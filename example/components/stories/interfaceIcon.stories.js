import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../../.storybook/store'

import InterfaceIcon from '../nacelle/InterfaceIcon'

export default {
  title: 'Components | General / Icon',
  decorators: [withInfo, StoryRouter()],
};

export const Wishlist = () => ({
  store,
  components: { InterfaceIcon },
  data() {
    return {
      iconName: 'wishlist',
      path: '/wishlist'
    }
  },
  template: '<interface-icon :iconName="iconName" :path="path"/>'
});

Wishlist.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const Account = () => ({
  store,
  components: { InterfaceIcon },
  data() {
    return {
      iconName: 'account',
      path: '/account'
    }
  },
  template: '<interface-icon :iconName="iconName" :path="path"/>'
});

Account.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const Cart = () => ({
  store,
  components: { InterfaceIcon },
  data() {
    return {
      iconName: 'cart',
      iconAction: 'cart/showCart'
    }
  },
  template: '<interface-icon :iconName="iconName" :iconAction="iconAction"/>'
});

Cart.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
