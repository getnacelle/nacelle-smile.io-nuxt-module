import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import PageContent from '../nacelle/PageContent'
import store from '../../.storybook/store'
import { defaultProduct } from '../../tests/mocks/defaultObjects';

const productArray = [
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct
]

const defaultObj = {
  contentful: [
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '1kmqDdWDL4rJQ4wIaAFcZm',
        type: 'Entry',
        createdAt: '2019-08-13T16:55:26.800Z',
        updatedAt: '2019-08-14T18:02:40.667Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 7,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'heroBanner'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentHeroBanner',
        title: 'The future of furniture',
        handle: 'the-future-of-furniture',
        subtitle: 'Testing',
        content: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'Test',
                  nodeType: 'text'
                }
              ],
              nodeType: 'paragraph'
            }
          ],
          nodeType: 'document'
        },
        featuredMedia: {
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: '9n7z3zrrmdu4'
              }
            },
            id: '4ykTjR1fM1563524AIRvq2',
            type: 'Asset',
            createdAt: '2019-08-13T16:56:17.128Z',
            updatedAt: '2019-08-16T16:31:37.747Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment'
              }
            },
            revision: 2,
            locale: 'en-US'
          },
          fields: {
            title: 'jupiter-bed',
            file: {
              url: '//images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg',
              details: {
                size: 114815,
                image: {
                  width: 1200,
                  height: 675
                }
              },
              fileName: 'iStock-476157466.jpg',
              contentType: 'image/jpeg'
            }
          }
        },
        publishDate: '2019-08-15T00:00-07:00',
        blogHandle: 'homepage',
        alignment: 'center',
        size: 'medium',
        mobileFullHeight: false,
        mobileBackgroundImage: {
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: '9n7z3zrrmdu4'
              }
            },
            id: '2mri2qBxe39mYOENoIIHTx',
            type: 'Asset',
            createdAt: '2019-08-12T23:34:26.211Z',
            updatedAt: '2019-08-12T23:34:26.211Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment'
              }
            },
            revision: 1,
            locale: 'en-US'
          },
          fields: {
            title: 'demo-photo1',
            file: {
              url: '//images.ctfassets.net/9n7z3zrrmdu4/2mri2qBxe39mYOENoIIHTx/5a453f3dabec858c0090f09b746df307/demo-photo1.jpeg',
              details: {
                size: 124110,
                image: {
                  width: 1200,
                  height: 700
                }
              },
              fileName: 'demo-photo1.jpeg',
              contentType: 'image/jpeg'
            }
          }
        },
        ctaText: 'Shop Now',
        ctaUrl: '/shop'
      }
    },
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '7p0xQtA9OQu1RoUvcsGV02',
        type: 'Entry',
        createdAt: '2019-08-13T23:10:19.358Z',
        updatedAt: '2019-08-13T23:10:19.358Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 1,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'productGrid'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentProductGrid',
        title: 'New Arrivals',
        handle: 'new-arrivals',
        columns: 4,
        publishDate: '2019-08-13T00:00-07:00',
        blogHandle: 'homepage'
      }
    },
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '5kbOHEVaQHIbKdiFH7zi2t',
        type: 'Entry',
        createdAt: '2019-08-13T23:09:19.132Z',
        updatedAt: '2019-08-13T23:09:19.132Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 1,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'sideBySide'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentSideBySide',
        title: 'Modern Styles',
        handle: 'modern-styles',
        content: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
                  nodeType: 'text'
                }
              ],
              nodeType: 'paragraph'
            }
          ],
          nodeType: 'document'
        },
        featuredMedia: {
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: '9n7z3zrrmdu4'
              }
            },
            id: '5YSVUJO2PAFG8lvvCOg1Jd',
            type: 'Asset',
            createdAt: '2019-08-12T23:25:11.194Z',
            updatedAt: '2019-08-12T23:25:11.194Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment'
              }
            },
            revision: 1,
            locale: 'en-US'
          },
          fields: {
            title: 'demo-photo3',
            file: {
              url: '//images.ctfassets.net/9n7z3zrrmdu4/5YSVUJO2PAFG8lvvCOg1Jd/335b6e906be4e5638dc597c41033e4e3/demo-photo3.jpeg',
              details: {
                size: 164105,
                image: {
                  width: 1200,
                  height: 700
                }
              },
              fileName: 'demo-photo3.jpeg',
              contentType: 'image/jpeg'
            }
          }
        },
        publishDate: '2019-08-13T00:00-07:00',
        blogHandle: 'homepage',
        backgroundColor: '#f2eee8',
        ctaText: 'Shop Now',
        ctaUrl: '/shop',
        reverseDesktop: true,
        reverseMobile: false
      }
    },
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '9n7z3zrrmdu4'
          }
        },
        id: '3p4NbUVGpD9Daj5RVGcLbB',
        type: 'Entry',
        createdAt: '2019-08-14T18:16:38.916Z',
        updatedAt: '2019-08-14T18:21:05.683Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 2,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'testimonials'
          }
        },
        locale: 'en-US'
      },
      fields: {
        contentType: 'ContentTestimonials',
        title: 'What People Are Saying',
        handle: 'what-people-are-saying',
        publishDate: '2019-08-14T00:00-07:00',
        blogHandle: 'homepage',
        slidesPerView: 2,
        alignment: 'left',
        slides: [
          {
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: '9n7z3zrrmdu4'
                }
              },
              id: '5WvwvfE40tdGfCqVATxW5s',
              type: 'Entry',
              createdAt: '2019-08-14T18:15:18.932Z',
              updatedAt: '2019-08-14T18:15:18.932Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment'
                }
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'testimonial'
                }
              },
              locale: 'en-US'
            },
            fields: {
              name: '@john-doe',
              quotation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.',
              featuredMedia: {
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: '9n7z3zrrmdu4'
                    }
                  },
                  id: '1KsG8pQDYVLqlHdVl0XSF8',
                  type: 'Asset',
                  createdAt: '2019-08-14T18:15:14.068Z',
                  updatedAt: '2019-08-14T18:15:14.068Z',
                  environment: {
                    sys: {
                      id: 'master',
                      type: 'Link',
                      linkType: 'Environment'
                    }
                  },
                  revision: 1,
                  locale: 'en-US'
                },
                fields: {
                  title: '300x300',
                  file: {
                    url: '//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png',
                    details: {
                      size: 1132,
                      image: {
                        width: 300,
                        height: 300
                      }
                    },
                    fileName: '300x300.png',
                    contentType: 'image/png'
                  }
                }
              }
            }
          },
          {
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: '9n7z3zrrmdu4'
                }
              },
              id: '2lbCIItVi4jNm9GEQlapx1',
              type: 'Entry',
              createdAt: '2019-08-14T18:16:16.531Z',
              updatedAt: '2019-08-14T18:16:16.531Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment'
                }
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'testimonial'
                }
              },
              locale: 'en-US'
            },
            fields: {
              name: '@the-fourth-user',
              quotation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.',
              featuredMedia: {
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: '9n7z3zrrmdu4'
                    }
                  },
                  id: '1KsG8pQDYVLqlHdVl0XSF8',
                  type: 'Asset',
                  createdAt: '2019-08-14T18:15:14.068Z',
                  updatedAt: '2019-08-14T18:15:14.068Z',
                  environment: {
                    sys: {
                      id: 'master',
                      type: 'Link',
                      linkType: 'Environment'
                    }
                  },
                  revision: 1,
                  locale: 'en-US'
                },
                fields: {
                  title: '300x300',
                  file: {
                    url: '//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png',
                    details: {
                      size: 1132,
                      image: {
                        width: 300,
                        height: 300
                      }
                    },
                    fileName: '300x300.png',
                    contentType: 'image/png'
                  }
                }
              }
            }
          },
          {
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: '9n7z3zrrmdu4'
                }
              },
              id: '6A0xqQ98vta3bbXwr4nz6P',
              type: 'Entry',
              createdAt: '2019-08-14T18:16:01.022Z',
              updatedAt: '2019-08-14T18:16:01.022Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment'
                }
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'testimonial'
                }
              },
              locale: 'en-US'
            },
            fields: {
              name: '@third-user-name',
              quotation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.',
              featuredMedia: {
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: '9n7z3zrrmdu4'
                    }
                  },
                  id: '1KsG8pQDYVLqlHdVl0XSF8',
                  type: 'Asset',
                  createdAt: '2019-08-14T18:15:14.068Z',
                  updatedAt: '2019-08-14T18:15:14.068Z',
                  environment: {
                    sys: {
                      id: 'master',
                      type: 'Link',
                      linkType: 'Environment'
                    }
                  },
                  revision: 1,
                  locale: 'en-US'
                },
                fields: {
                  title: '300x300',
                  file: {
                    url: '//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png',
                    details: {
                      size: 1132,
                      image: {
                        width: 300,
                        height: 300
                      }
                    },
                    fileName: '300x300.png',
                    contentType: 'image/png'
                  }
                }
              }
            }
          },
          {
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: '9n7z3zrrmdu4'
                }
              },
              id: '4CwmZ0Yf4cDszz7kfAt739',
              type: 'Entry',
              createdAt: '2019-08-14T18:15:41.499Z',
              updatedAt: '2019-08-14T18:15:41.499Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment'
                }
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'testimonial'
                }
              },
              locale: 'en-US'
            },
            fields: {
              name: '@user-two',
              quotation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.',
              featuredMedia: {
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: '9n7z3zrrmdu4'
                    }
                  },
                  id: '1KsG8pQDYVLqlHdVl0XSF8',
                  type: 'Asset',
                  createdAt: '2019-08-14T18:15:14.068Z',
                  updatedAt: '2019-08-14T18:15:14.068Z',
                  environment: {
                    sys: {
                      id: 'master',
                      type: 'Link',
                      linkType: 'Environment'
                    }
                  },
                  revision: 1,
                  locale: 'en-US'
                },
                fields: {
                  title: '300x300',
                  file: {
                    url: '//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png',
                    details: {
                      size: 1132,
                      image: {
                        width: 300,
                        height: 300
                      }
                    },
                    fileName: '300x300.png',
                    contentType: 'image/png'
                  }
                }
              }
            }
          }
        ]
      }
    }
  ],
  shopify: [
    {
      title: 'Widget Co Hero',
      handle: 'widget-co-hero',
      contentHtml: 'Bringing You the Best Widgets!',
      image: {
        id: 'Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvOTYyOTI3MDExMw==',
        originalSrc: 'https://cdn.shopify.com/s/files/1/0255/4491/7089/articles/contentful-demo-4.jpeg?v=1568650754'
      },
      tags: [
        'field::alignment::left',
        'field::contentType::ContentHeroBanner',
        'field::ctaText::Shop Now!',
        'field::ctaUrl::/shop',
        'field::textColor::#fff'
      ],
      alignment: 'left',
      contentType: 'ContentHeroBanner',
      ctaText: 'Shop Now!',
      ctaUrl: '/shop',
      textColor: '#fff'
    },
    {
      title: 'What People Are Saying',
      handle: 'what-people-are-saying',
      contentHtml: '',
      image: null,
      tags: [
        'field::contentType::ContentTestimonials'
      ],
      contentType: 'ContentTestimonials'
    },
    {
      title: 'Mr. Spacely',
      handle: 'mr-spacely',
      contentHtml: 'These were exactly what I was looking for!',
      image: null,
      tags: [
        'childSection',
        'field::contentType::ContentTestimonial'
      ],
      contentType: 'ContentTestimonial'
    },
    {
      title: 'Hundreds of Colors',
      handle: 'hundreds-of-colors',
      contentHtml: 'So many options to choose from! Widgets for every occasion!',
      image: {
        id: 'Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvOTYyOTQ5OTQ4OQ==',
        originalSrc: 'https://cdn.shopify.com/s/files/1/0255/4491/7089/articles/demo-photo6.jpeg?v=1568653303'
      },
      tags: [
        'field::backgroundColor::#D9B18C',
        'field::contentType::ContentSideBySide',
        'field::ctaUrl::/shop',
        'field::ctaText::Find Your Color',
        'field::reverseDesktop::true'
      ],
      backgroundColor: '#D9B18C',
      contentType: 'ContentSideBySide',
      ctaUrl: '/shop',
      ctaText: 'Find Your Color',
      reverseDesktop: 'true'
    },
    {
      title: 'Mr. Cogswell',
      handle: 'mr-cogswell',
      contentHtml: 'Their quality and attention to detail is unparalleled.',
      image: null,
      tags: [
        'childSection',
        'field::contentType::ContentTestimonial'
      ],
      contentType: 'ContentTestimonial'
    },
    {
      title: 'Locally Crafted!',
      handle: 'locally-crafted',
      contentHtml: 'Our widgets are produced right in your backyard!',
      image: {
        id: 'Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvOTYyOTQzMzk1Mw==',
        originalSrc: 'https://cdn.shopify.com/s/files/1/0255/4491/7089/articles/IconEb1_822px.jpg?v=1568652668'
      },
      tags: [
        'field::contentType::ContentSideBySide',
        'field::ctaText::Learn More!',
        'field::ctaUrl::/about-us'
      ],
      contentType: 'ContentSideBySide',
      ctaText: 'Learn More!',
      ctaUrl: '/about-us'
    },
    {
      title: "What's New",
      handle: 'whats-new',
      contentHtml: '',
      image: null,
      tags: [
        'field::contentType::ContentProductGrid'
      ],
      contentType: 'ContentProductGrid'
    }
  ]
}

export default {
  title: 'Components | Content / Page Content',
  decorators: [StoryRouter()],
};

export const ContentfulContent = () => ({
  components: { PageContent },
  store,
  data() {
    return {
      page: {
        source: 'contentful',
        sections: defaultObj.contentful
      },
      products: productArray
    }
  },
  template: `
    <page-content :page="page" :products="products"/>
  `
});

export const CustomPageContentMapper = () => ({
  components: { PageContent },
  store,
  data() {
    return {
      page: {
        source: 'contentful',
        sections: defaultObj.contentful
      },
      products: productArray
    }
  },
  computed: {
    customMappedContent() {
      return this.page.sections.map(section => {
        return section.fields.handle
      })
    }
  },
  template: `
    <page-content :page="page" :products="products">
      <template v-slot="{ page }">
        <div>
          <h3>Custom Content Mapper</h3>
          <ul>
            <li v-for="section in customMappedContent" :key="section">
              {{ section }}
            </li>
          </ul>
        </div>
      </template>
    </page-content>
  `
});

CustomPageContentMapper.story = {
  parameters: {
    info: {
      summary: 'By default page content will look at the source of the page and use either a Shopify or Contentful data mapper. The mapper and mapper function can be customized.'
    }
  },
};

export const CustomSectionComponents = () => ({
  components: { PageContent },
  store,
  data() {
    return {
      page: {
        source: 'contentful',
        sections: defaultObj.contentful
      },
      products: productArray
    }
  },
  computed: {
    customMappedContent() {
      return this.page.content.map(section => {
        return section.id
      })
    }
  },
  template: `
    <page-content :page="page" :products="products">
      <template v-slot:section="{ section }">
        <div style="padding: 1em">
          {{ section.data.title }}
        </div>
      </template>
    </page-content>
  `
});

CustomSectionComponents.story = {
  parameters: {
    info: {
      summary: ''
    }
  },
};

export const ShopifyContent = () => ({
  components: { PageContent },
  store,
  data() {
    return {
      page: {
        source: 'shopify',
        sections: defaultObj.shopify
      },
      products: productArray
    }
  },
  computed: {
    customMappedContent() {
      return this.page.content.map(section => {
        return section.id
      })
    }
  },
  template: `
    <page-content :page="page" :products="products"/>
  `
});

ShopifyContent.story = {
  name: 'Shopify Content',

  parameters: {
    info: {
      summary: ''
    }
  },
};

export const CustomContentfulContentTypes = () => ({
  components: { PageContent },
  store,
  data() {
    return {
      page: {
        source: 'contentful',
        sections: [
          ...defaultObj.contentful,
          {
            fields: {
              contentType: 'NewContentSection',
              title: 'New Content Section',
              handle: 'new-content-section',
              customField: true,
              customField2: false,
              publishDate: '2019-08-13T00:00-07:00',
              blogHandle: 'homepage',
              content: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Test',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: 'paragraph'
                  }
                ],
                nodeType: 'document'
              }
            }
          }
        ]
      },
      products: productArray
    }
  },
  computed: {
    customMappedContent() {
      return this.page.content.map(section => {
        return section.id
      })
    }
  },
  template: `
    <page-content :page="page" :products="products">
      <template v-slot:section="{ section }">
        <div style="padding: 1em">
          {{ section.data.title }}
          <pre>{{ section.data }}</pre>
        </div>
      </template>
    </page-content>
  `
});

CustomContentfulContentTypes.story = {
  parameters: {
    info: {
      summary: ''
    }
  },
};

export const CustomShopifyContentTypes = () => ({
  components: { PageContent },
  store,
  data() {
    return {
      page: {
        source: 'shopify',
        sections: [
          ...defaultObj.shopify,
          {
            title: 'New Shopify Section',
            handle: 'new-shopify-section',
            contentHtml: 'This is some content',
            image: {},
            tags: [
              'field::contentType::NewShopifySection',
              'field::customField::true'
            ]
          },
          {
            title: 'Custom Slider',
            handle: 'custom-slider',
            contentHtml: '',
            image: null,
            tags: [
              'field::contentType::CustomSlider'
            ]
          },
          {
            title: 'Custom Slider Slide',
            handle: 'custom-slider-slide',
            contentHtml: '',
            image: null,
            tags: [
              'childSection',
              'field::contentType::CustomSliderSlide'
            ]
          }
        ]
      },
      products: productArray
    }
  },
  computed: {
    customMappedContent() {
      return this.page.content.map(section => {
        return section.id
      })
    }
  },
  template: `
    <page-content :page="page" :products="products">
      <template v-slot:section="{ section }">
        <div style="padding: 1em">
          {{ section.data.title }}
          <pre>{{ section.data }}</pre>
        </div>
      </template>
    </page-content>
  `
});

CustomShopifyContentTypes.story = {
  parameters: {
    info: {
      summary: ''
    }
  },
};
