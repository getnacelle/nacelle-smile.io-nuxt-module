import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';

import InterfaceLogo from '../nacelle/InterfaceLogo';

export default {
  title: 'Components | General',
  decorators: [withInfo, StoryRouter()],
};

export const Logo = () => ({
  components: { InterfaceLogo },
  data() {
    return {
      src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png',
    };
  },
  template: `<interface-logo :src='src'
  />`,
});

Logo.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
