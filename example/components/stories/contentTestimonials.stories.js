import { withInfo } from 'storybook-addon-vue-info'

import ContentTestimonials from '../nacelle/ContentTestimonials'

export default {
  title: 'Components | Content / Testimonials',
  decorators: [withInfo],
};

export const WithImages = () => ({
  components: { ContentTestimonials },
  data() {
    return {
      title: 'Testimonials',
      slides: [
        {
          name: '@username1',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.',
          imageUrl: 'https://placehold.it/400x400'
        },
        {
          name: '@username-two',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat, est sit amet tincidunt maximus, eros nibh pulvinar metus.',
          imageUrl: 'https://placehold.it/400x400'
        },
        {
          name: '@user-three',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat fermentum erat, vel pellentesque ex.',
          imageUrl: 'https://placehold.it/400x400'
        }
      ]
    }
  },
  template: `
    <content-testimonials
      :title="title"
      :slides="slides"
    />
  `
});

WithImages.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const NoImageCentered = () => ({
  components: { ContentTestimonials },
  data() {
    return {
      title: 'Testimonials',
      slides: [
        {
          name: '@username1',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.'
        },
        {
          name: '@username-two',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat, est sit amet tincidunt maximus, eros nibh pulvinar metus.'
        },
        {
          name: '@user-three',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat fermentum erat, vel pellentesque ex.'
        }
      ]
    }
  },
  template: `
    <content-testimonials
      :alignment="'centered'"
      :title="title"
      :slides="slides"
    />
  `
});

NoImageCentered.story = {
  name: 'No Image, Centered',

  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

// export default {
//   title: 'Components | Content / Testimonials',
//   decorators: [withInfo],
// };

export const _2Up = () => ({
  components: { ContentTestimonials },
  data() {
    return {
      title: 'Testimonials',
      slides: [
        {
          name: '@username1',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.'
        },
        {
          name: '@username-two',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat, est sit amet tincidunt maximus, eros nibh pulvinar metus.'
        },
        {
          name: '@user-three',
          quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat fermentum erat, vel pellentesque ex.'
        }
      ]
    }
  },
  template: `
    <content-testimonials
      :alignment="'centered'"
      :title="title"
      :slides="slides"
      :slidesPerView="2"
    />
  `
});

_2Up.story = {
  name: '2-Up',

  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
