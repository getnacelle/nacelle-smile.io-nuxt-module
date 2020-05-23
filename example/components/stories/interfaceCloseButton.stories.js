import { withInfo } from 'storybook-addon-vue-info';

import InterfaceCloseButton from '../nacelle/InterfaceCloseButton';

export default {
  title: 'Components | General',

  decorators: [
    withInfo,
    () => {
      return {
        template: '<div style="padding: 3rem;"><story/></div>',
      };
    },
  ],
};

export const CloseButton = () => ({
  components: { InterfaceCloseButton },
  template: `
    <interface-close-button/>
  `,
});

CloseButton.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
