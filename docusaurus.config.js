// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ant Media Documentation',
  tagline: 'Ant Media Documentation',
  url: 'https://antmedia.io',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'warn', // replace with 'throw' to stop building if broken links
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ant-media', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  deploymentBranch: 'master', // The branch that GitHub pages deploys from.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
          editUrl: 'https://github.com/ant-media/ant-media-documentation/edit/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-464H6Y7FRM',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  plugins: [[ require.resolve('docusaurus-lunr-search'), {
    languages: ['en']
  }],
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [
        {
          to: '/guides/clustering-and-scaling/alibaba/scaling-with-alibaba/',
          from: '/guides/clustering-and-scaling/scaling-with-alibaba/',
        },
        {
          to: '/guides/clustering-and-scaling/supported-databases/scaling-with-redis/',
          from: '/guides/clustering-and-scaling/scaling-with-redis/',
        },
        {
          to: '/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/',
          from: '/guides/clustering-and-scaling/scaling-with-mongodb-atlas/',
        },
        {
          to: '/guides/clustering-and-scaling/manual-configuration/cluster-installation/',
          from: '/guides/clustering-and-scaling/cluster-installation/',
        },
        {
          to: '/guides/clustering-and-scaling/manual-configuration/multi-level-cluster/',
          from: '/guides/clustering-and-scaling/multi-level-cluster/',
        },
        {
          from: '/guides/clustering-and-scaling/aws/installing-ams-on-aws-eks/',
          to: '/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/'
        }
      ],
    },
  ], 
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{name: 'keywords', content: 'Ant Media Documentation, Ant Media Server, Ant Media, Ultra Low Latency Streaming, WebRTC streaming, HLS Streaming'}],
      navbar: {
        title: '',
        logo: {
          href: '/',
          alt: 'Ant Media Server Documentation',
          src: 'img/Ant-Media-Logo-dark.png',
          srcDark: 'img/Ant-Media-Logo-light.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            label: 'Guides',
            position: 'left'
          },
          {
            label: 'SDK References',
            href: '/sdk-reference/',
            position: 'left'
          },
          {
            label: 'Resources',
            type: 'dropdown',
            position: 'left',
            items: [
              {
                label: 'API References',
                href: 'https://antmedia.io/rest/',
              },
              {
                label: 'Github Discussions',
                href: 'https://github.com/orgs/ant-media/discussions',
              },
              {
                label: 'Videos',
                href: 'https://www.youtube.com/@AntMediaServer'
              },
              {
                label: 'Sample Plugins',
                href: 'https://github.com/ant-media/Plugins',
              },
              {
                label: 'Marketplace',
                href: 'https://antmedia.io/marketplace'
              },
              {
                label: 'Blog',
                href: 'https://antmedia.io/blog/',
              },
            ]
          },
          /*{
            label: 'Ant Media',
            href: 'https://antmedia.io/',
            position: 'right'
          },*/
          {
            type: 'html',
            position: 'right',
            value: '<a target="_blank" href="https://antmedia.io/monthly/?aero-add-to-checkout=47606" class="docs-free-trial">Start a Free Trial</a>',
          },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Sample Applications',
                to: '/get-started/sample-tools-and-applications/',
              },
              {
                label: 'Clustering & Scaling',
                to: '/category/clustering-and-scaling/',
              },
              {
                label: 'Adaptive Bitrate',
                to: '/category/adaptive-bitrate/',
              },
              {
                label: 'Troubleshooting',
                to: '/guides/troubleshooting/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Developer Discussion',
                href: 'https://github.com/ant-media/Ant-Media-Server/discussions',
              },
              {
                label: 'Stackoverflow',
                href: 'https://stackoverflow.com/questions/tagged/ant-media-server',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ant-media',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/@AntMediaServer/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'My Account',
                href: 'https://antmedia.io/my-account/',
              },
              {
                label: 'Support Packages',
                href: 'https://antmedia.io/pricing/support-packages/',
              },
              {
                label: 'Blog',
                to: 'https://antmedia.io/blog/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ant Media`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      announcementBar: {
        id: 'AWS Streaming Service Wizard',
        content:
          '<div style="font-size:16px;"><div style="padding:10px;"><strong><a href="https://antmedia.io/cloud/" target="_blank" rel="noopener noreferrer">AWS Streaming Service Wizard</a></strong>: <a target="_blank" rel="noopener noreferrer" href="https://antmedia.io/create-your-own-streaming-service-on-aws-in-5-minutes/">Create Your Own Scalable Streaming Service on AWS in 5 minutes and Scale as you Need</a></div></div>',
        backgroundColor: '#fff5bd',
        textColor: '#091E42',
        isCloseable: false,
      },
    }),
};

module.exports = config;
