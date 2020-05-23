import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../../.storybook/store';

import ContentSideBySide from '../nacelle/ContentSideBySide'

export default {
  title: 'Components | Content / Side by Side',
  decorators: [withInfo, withKnobs],
};

export const Default = () => ({
  store,
  components: { ContentSideBySide },
  props: {
    imageUrl: {
      default: text('Image Url', 'https://placehold.it/800x800')
    },
    title: {
      default: text('Title', 'Section Title')
    },
    copy: {
      default: text('Copy', 'Lorem ipsum dolor set...')
    },
    ctaText: {
      default: text('CTA Text', 'Action')
    },
    backgroundColor: {
      default: text('Background Color', '')
    },
    reverseDesktop: {
      default: boolean('Reverse Desktop', false)
    },
    reverseMobile: {
      default: boolean('Reverse Mobile', false)
    }
  },
  template: `
    <content-side-by-side
      :imageUrl="imageUrl"
      :title="title"
      :copy="copy"
      :ctaText="ctaText"
      :backgroundColor="backgroundColor"
      :reverseDesktop="reverseDesktop"
      :reverseMobile="reverseMobile"
    />
  `
});

Default.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const CustomSlots = () => ({
  store,
  components: { ContentSideBySide },
  props: {
    imageUrl: {
      default: text('Image Url', 'https://placehold.it/800x800')
    },
    title: {
      default: text('Title', 'Section Title')
    },
    copy: {
      default: text('Copy', 'Lorem ipsum dolor set...')
    },
    ctaText: {
      default: text('CTA Text', 'Action')
    },
    backgroundColor: {
      default: text('Background Color', '')
    },
    reverseDesktop: {
      default: boolean('Reverse Desktop', false)
    },
    reverseMobile: {
      default: boolean('Reverse Mobile', false)
    }
  },
  template: `
    <content-side-by-side
      :imageUrl="imageUrl"
      :title="title"
      :copy="copy"
      :ctaText="ctaText"
      :backgroundColor="backgroundColor"
      :reverseDesktop="reverseDesktop"
      :reverseMobile="reverseMobile"
    >
      <template v-slot:body>
        <p>Custom Body Template</p>
      </template>
    </content-side-by-side>
  `
});

CustomSlots.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
