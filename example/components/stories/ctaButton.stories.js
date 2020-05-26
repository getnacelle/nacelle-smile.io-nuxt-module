import { withInfo } from 'storybook-addon-vue-info';

import CtaButton from '../nacelle/CtaButton';

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

export const _CtaButton = () => ({
  components: { CtaButton },
  data() {
    return {
      to: 'http://www.google.com',
    };
  },
  template: `
    <cta-button :to="to">
      CTA Button
    </cta-button>
  `,
});

_CtaButton.story = {
  name: 'CTA Button',

  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
