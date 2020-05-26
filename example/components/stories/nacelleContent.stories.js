import { withInfo } from 'storybook-addon-vue-info';
import StoryRouter from 'storybook-vue-router';
import store from '../../.storybook/store';

import NacelleContent from '../nacelle/NacelleContent';
import PageContent from '../nacelle/PageContent';

export default {
  title: 'Components | Nacelle Data',
  decorators: [withInfo, StoryRouter()],
};

export const Content = () => ({
  store,
  components: { NacelleContent, PageContent },
  template: `
    <div>
      <nacelle-content :handle="'test 1'" :type="'content'">
        <template v-slot:default="{ content }">
          <page-content :page="content" />
        </template>
      </nacelle-content>
    </div>
  `,
});

Content.story = {
  parameters: {
    info: {
      // summary: "Hello"
    },
  },
};
