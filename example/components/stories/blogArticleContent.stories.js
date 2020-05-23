import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../../.storybook/store'
import {
  defaultProduct,
  shopifyArticle,
  contentfulArticle
} from '../../tests/mocks/defaultObjects'

import BlogArticleContent from '../nacelle/BlogArticleContent'

const storyWrapper = () => {
  return {
    template: `
      <div style="padding: 3rem; max-width: 720px; margin: 0 auto;"><story/></div>
    `
  }
}

export default {
  title: 'Components | Content / Blog / Article Content',
  decorators: [withInfo, StoryRouter(), storyWrapper],
};

export const Shopify = () => ({
  components: { BlogArticleContent },
  data() {
    return {
      article: shopifyArticle
    }
  },
  template: `
    <blog-article-content :article="article" />
  `
});

Shopify.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const ShopifyWithShopLook = () => ({
  components: { BlogArticleContent },
  store,
  data() {
    return {
      article: shopifyArticle,
      products: [defaultProduct]
    }
  },
  template: `
    <blog-article-content
      :article="article"
      :products="products"
    />
  `
});

ShopifyWithShopLook.story = {
  name: 'Shopify with Shop Look',
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const ShopLookWithCustomProductCard = () => ({
  components: { BlogArticleContent },
  store,
  data() {
    return {
      article: shopifyArticle,
      products: [defaultProduct]
    }
  },
  template: `
    <blog-article-content
      :article="article"
      :products="products"
    >
      <template v-slot:product-card="{ product }">
        {{ product }}
      </template>
    </blog-article-content>
  `
});

ShopLookWithCustomProductCard.story = {
  name: 'Shop Look with Custom Product Card',
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const Contentful = () => ({
  components: { BlogArticleContent },
  data() {
    return {
      article: contentfulArticle
    }
  },
  template: `
    <blog-article-content
      :article="article"
    />
  `
});

Contentful.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};

export const Customized = () => ({
  components: { BlogArticleContent },
  data() {
    return {
      article: contentfulArticle
    }
  },
  template: `
    <blog-article-content :article="article">
      <div>
        <h1 class="title">This is extra content appended to the article</h1>
      </div>
    </blog-article-content>
  `
});

Customized.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  },
};
