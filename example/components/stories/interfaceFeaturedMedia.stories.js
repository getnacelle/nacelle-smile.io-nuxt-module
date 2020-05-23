import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';

import InterfaceFeaturedMedia from '../nacelle/InterfaceFeaturedMedia';

export default {
  title: 'Components | General',
  decorators: [withInfo, StoryRouter()],
};

export const FeaturedMedia = () => ({
  components: { InterfaceFeaturedMedia },
  data() {
    return {
      media: {
        src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
        type: 'image/jpeg',
      },
    };
  },
  template: `
    <interface-featured-media :media="media" />
  `,
});

FeaturedMedia.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
