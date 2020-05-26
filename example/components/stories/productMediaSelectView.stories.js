import { withInfo } from 'storybook-addon-vue-info';
import store from '../../.storybook/store';

import ProductMediaSelectView from '../nacelle/ProductMediaSelectView';

export default {
  title: 'Components | Product',
  decorators: [withInfo],
};

export const MediaSelectView = () => ({
  store,
  components: { ProductMediaSelectView },
  template: `<div class="section">
    <div class="columns">
    <div class="column is-6">
      <product-media-select-view :media="media" :featured-media="featuredMedia"/>
      </div>
      </div>
    </div>`,
  data() {
    return {
      media: [
        {
          src: 'https://picsum.photos/id/52/500/500',
          type: 'image',
          thumbnailSrc: 'https://picsum.photos/id/52/500/500',
        },
        { src: 'https://picsum.photos/id/980/500/500', type: 'image' },
        { src: 'https://picsum.photos/id/585/500/500', type: 'image' },
        { src: 'https://picsum.photos/id/576/500/500', type: 'image' },
        { src: 'https://picsum.photos/id/52/500/500', type: 'image' },
      ],
      featuredMedia: {
        src: 'https://picsum.photos/id/960/500/500',
        type: 'image',
      },
    };
  },
});

MediaSelectView.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
