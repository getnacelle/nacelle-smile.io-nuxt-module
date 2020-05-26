import { action } from '@storybook/addon-actions'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../../.storybook/store';

import ContentHeroBanner from '../nacelle/ContentHeroBanner'

const defaults = {
  backgroundImgUrl: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img.png',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

export default {
  title: 'Components | Content / Hero Banner',
  decorators: [withInfo],
};

export const Default = () => ({
  store,
  components: { ContentHeroBanner },
  data() {
    return {
      ...defaults
    }
  },
  template: `
    <content-hero-banner
      :backgroundImgUrl="backgroundImgUrl"
      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
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

// export default {
//   title: 'Components | Content / Hero Banner',
//   decorators: [withInfo],
// };

export const FullHeight = () => ({
  store,
  components: { ContentHeroBanner },
  data() {
    return {
      ...defaults,
      size: 'fullheight'
    }
  },
  template: `
    <content-hero-banner
      :size="size"
      :backgroundImgUrl="backgroundImgUrl"
      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
    />
  `
});

FullHeight.story = {
  name: 'Full height',
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

// export default {
//   title: 'Components | Content / Hero Banner',
//   decorators: [withInfo],
// };

export const TextColor = () => ({
  store,
  components: { ContentHeroBanner },
  data() {
    return {
      ...defaults,
      textColor: '#ffffff'
    }
  },
  template: `
    <content-hero-banner
      :backgroundImgUrl="backgroundImgUrl"
      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
      :textColor="textColor"
    />
  `
});

TextColor.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

// export default {
//   title: 'Components | Content / Hero Banner',
//   decorators: [withInfo],
// };

export const CustomCtaEvent = () => ({
  store,
  components: { ContentHeroBanner },
  data() {
    return {
      ...defaults,
      ctaHandler: action('CTA click')
    }
  },
  template: `
    <content-hero-banner
      :backgroundImgUrl="backgroundImgUrl"
      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
      :ctaHandler="ctaHandler"
    />
  `
});

CustomCtaEvent.story = {
  name: 'Custom CTA event',

  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

// export default {
//   title: 'Components | Content / Hero Banner',
//   decorators: [withInfo],
// };

export const MobileImage = () => ({
  store,
  components: { ContentHeroBanner },
  data() {
    return {
      ...defaults,
      mobileFullHeight: true,
      mobileBackgroundImgUrl:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-mobile-banner.png'
    }
  },
  template: `
    <content-hero-banner
      :backgroundImgUrl="backgroundImgUrl"
      :mobileBackgroundImgUrl="mobileBackgroundImgUrl"
      :mobileFullHeight="mobileFullHeight"
      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
    />
  `
});

MobileImage.story = {
  name: 'Mobile image',

  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

// export default {
//   title: 'Components | Content / Hero Banner',
//   decorators: [withInfo],
// };

export const CustomSlots = () => ({
  store,
  components: { ContentHeroBanner },
  data() {
    return {
      ...defaults,
      mobileFullHeight: true,
      mobileBackgroundImgUrl:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-mobile-banner.png'
    }
  },
  template: `
    <content-hero-banner
      :backgroundImgUrl="backgroundImgUrl"
      :mobileBackgroundImgUrl="mobileBackgroundImgUrl"
      :mobileFullHeight="mobileFullHeight"
      :title="title"
      :subtitle="subtitle"
      :ctaText="ctaText"
    >
      <template v-slot:background="{ backgroundImgUrl }">
        <img :src="backgroundImgUrl" width="300px" alt="" />
      </template>
      <template v-slot:body>
        <h5>Testing Slots</h5>
      </template>
      <template v-slot:cta="{ ctaText }">
        <p>{{ ctaText }}</p>
      </template>
    </content-hero-banner>
  `
});

CustomSlots.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
