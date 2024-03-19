// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';


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

  /* Disable js/script.js because it gives 404 error - @mekya
  scripts: [
    {
      src: 'js/script.js',
      async: false,
    }
  ],
  */

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
          to: '/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-aws-eks/'
        },
        {
          from: '/guides/developer-sdk-and-api/rest-api-guide/enabling-ip-filtering-behind-load-balancer-in-aws/',
          to: '/guides/clustering-and-scaling/aws/enabling-ip-filtering-behind-load-balancer-in-aws/'
        },
        {
          from: '/guides/clustering-and-scaling/aws/Configuring-RTMP-LB-in-AWS/',
          to: '/guides/clustering-and-scaling/aws/configuring-rtmp-lb-in-aws/'
        },
        {
          from: '/guides/clustering-and-scaling/aws/Scaling-at-AWS-ECS-Fargate/',
          to: '/guides/clustering-and-scaling/aws/scaling-at-aws-ecs-fargate/'
        },
        {
          from: '/guides/playing-live-stream/HLS-Playing/',
          to: '/guides/playing-live-stream/hls-playing/'
        },
        {
          from: '/guides/playing-live-stream/vod-streaming-via-webrtc-hls/',
          to: '/guides/publish-live-stream/playlist/'
        },
        {
          from: '/guides/stream-security/',
          to: '/category/stream-security/'
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/',
          to: '/category/sdk-integration/'
        },
	{
          from: '/guides/playing-live-stream/webrtc-playing/',
          to: '/guides/playing-live-stream/webrtc-playback/'
        },
	{
          from: '/guides/publish-live-stream/Simulcasting/',
          to: '/guides/publish-live-stream/simulcasting/'
        },
	{
          from: '/guides/advanced-usage/stream-security/',
          to: '/category/stream-security/'
        },
	{
          from: '/guides/advanced-usage/monitoring/monitoring-ams-with-datadog/',
          to: '/guides/monitoring/monitoring-ams-with-datadog/'
        },
	{
          from: '/v1/docs/rest-api-guide/',
          to: '/category/rest-api-guide/'
        },
	{
          from: '/guides/clustering-and-scaling/kubernetes/install-ssl-on-kubernetes-using-lets-encrypt/',
          to: '/category/kubernetes/'
        },
	{
          from: '/guides/advanced-usage/monitoring/monitoring-ams-with-grafana/',
          to: '/guides/monitoring/monitoring-ams-with-grafana/'
        },
	{
          from: '/guides/publish-live-stream/webrtc-peer-to-peer-communication/',
          to: '/guides/publish-live-stream/webrtc/webrtc-peer-to-peer-communication/'
        },
	{
          from: '/v1/docs/amazon-aws-s3-integration/',
          to: '/guides/recording-live-streams/s3-integration-http-forwarding/'
        },
	{
          from: '/guides/developer-sdk-and-api/rest-api-guide/stream-security/',
          to: '/category/stream-security/'
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/android-sdk/',
          to: '/category/android-sdk/'
        },
	{
          from: '/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/',
          to: '/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-aws-eks/'
        },
	{
          from: '/guides/playing-live-stream/webrtc-conference-call/',
          to: '/guides/publish-live-stream/webrtc/webrtc-conference-call/'
        },
	{
          from: '/guides/configuration-and-testing/load-testing/',
          to: '/guides/configuration-and-testing/webrtc-load-testing/'
        },
	{
          from: '/v1/docs/ssl-setup/',
          to: '/guides/installing-on-linux/setting-up-ssl/'
        },
	{
          from: '/v1/docs/integrating-with-s3/',
          to: '/guides/recording-live-streams/s3-integration-http-forwarding/'
        },
	{
          from: '/v1/docs/clustering/',
          to: '/category/clustering-and-scaling/'
        },
	{
          from: '/v1/docs/getting-started-with-ant-media-server/',
          to: '/category/get-started/'
        },
	{
          from: '/v1/docs/clustering-and-scaling-ant-media-server/',
          to: '/category/clustering-and-scaling/'
        },
	{
          from: '/v1/docs/how-to-enable-ip-filter-for-ant-media-servers-behind-load-balancer-in-aws/',
          to: '/guides/clustering-and-scaling/aws/enabling-ip-filtering-behind-load-balancer-in-aws/'
        },
	{
          from: '/v1/docs/how-to-configure-rtmp-load-balancer-in-aws/',
          to: '/guides/clustering-and-scaling/aws/configuring-rtmp-lb-in-aws/'
        },
        {
          from: '/docs/guides/developer-sdk-and-api/rest-api-guide/rest-api-guide/',
          to: '/category/rest-api-guide/'
        },
        {
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-autoscaling/',
          to: '/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/'
        },

      ],
    },
  ], /*
  [
    'docusaurus-pushfeedback',{
        project: '7i7jw6ovwx',
        "button-position": 'bottom-right',
        "button-style": "dark"
    }
  ]*/
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
          src: 'img/Ant-Media-Logo-light.png',
          srcDark: 'img/Ant-Media-Logo-light.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            label: 'Guides',
            position: 'right'
          },
          {
            label: 'SDK references',
            href: '/sdk-reference/',
            position: 'right'
          },
          {
            label: 'Blog',
            href: 'https://antmedia.io/blog/',
            position: 'right'
          },
          {
            label: 'Ant Media',
            href: 'https://antmedia.io/',
            position: 'right'
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },*/
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
	theme: prismThemes.github,
	darkTheme: prismThemes.dracula,
      },
      announcementBar: {
        id: 'announcement-bar',
        content:
          `<div style="font-size:16px;">
          <a target="_blank" href="https://antmedia.io/create-your-own-streaming-service-on-aws-in-5-minutes/">
            <strong>How to Get Your Own Auto Scalable Streaming Service on AWS in 5 minutes?</strong>
          </a>
          </div>`,
        backgroundColor: '#fff5bd',
        textColor: '#091E42',
        isCloseable: false,
      },
    }),
};

module.exports = config;
