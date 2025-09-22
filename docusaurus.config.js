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


scripts: [
    {
      src: "/docs/zfEmbed.js", // Ensure this loads first
      async: false, // Load it synchronously	    
    },
    {
      src: "/docs/zonka.js", // Load after zfEmbed.js
      async: true,
      defer: true,
    },
],


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
          lastVersion: 'current',
          versions: {
            'current': {
              label: '2.14', // Customize the label for the current (unversioned) docs
              path: '', // Leave empty to use the root URL for the latest version
              banner: 'none',
            },
            '2.13': {
              label: '2.13', // Customize the label for the current (unversioned) docs
              path: 'version-2.13', // Leave empty to use the root URL for the latest version
              banner: 'none',
              }
          },
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
          to: '/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/'
        },
        {
          from: '/guides/clustering-and-scaling/aws/Configuring-RTMP-LB-in-AWS/',
          to: '/guides/clustering-and-scaling/aws/aws-lb/configuring-rtmp-lb-in-aws/'
        },
        {
          from: '/guides/clustering-and-scaling/aws/Scaling-at-AWS-ECS-Fargate/',
          to: '/guides/clustering-and-scaling/aws/aws-ecs/scaling-at-aws-ecs-fargate/'
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
          to: '/category/monitoring-solutions/'
        },
	{
          from: '/guides/monitoring/monitoring-ams-with-datadog/',
          to: '/category/monitoring-solutions/'
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
          from: '/v1/docs/amazon-aws-s3-integration/',
          to: '/category/recording-live-streams/'
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
          to: '/guides/publish-live-stream/webrtc/webrtc-conference-call/',
        },
	{
          from: '/guides/configuration-and-testing/load-testing/',
          to: '/category/load-testing/'
        },
	{
          from: '/guides/configuration-and-testing/webrtc-load-testing/',
          to: '/category/load-testing/'
        },
	{
          from: '/v1/docs/ssl-setup/',
          to: '/guides/installing-on-linux/setting-up-ssl/'
        },
	{
          from: '/v1/docs/integrating-with-s3/',
          to: '/category/s3-recording-and-integration/'
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
          to: '/guides/clustering-and-scaling/aws/aws-lb/enabling-ip-filtering-behind-load-balancer-in-aws/'
        },
	{
          from: '/v1/docs/how-to-configure-rtmp-load-balancer-in-aws/',
          to: '/guides/clustering-and-scaling/aws/aws-lb/configuring-rtmp-lb-in-aws/'
        },
        {
          from: '/guides/developer-sdk-and-api/rest-api-guide/rest-api-guide/',
          to: '/category/rest-api-guide/'
        },
	{
          from: '/guides/developer-sdk-and-api/rest-api-guide/',
          to: '/category/rest-api-guide/'
        },
        {
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-autoscaling/',
          to: '/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/'
        },
	{
          from: '/guides/configuration-and-testing/configuring-stun-addresses/',
          to: '/guides/configuration-and-testing/configuring-stun-turn-addresses/'
        },
	{
          from: '/guides/advanced-usage/turn-and-stun-installation/coturn-quick-installation/',
          to: '/guides/advanced-usage/turn-instalation/coturn-quick-installation/'
        },
	{
          from: '/category/stream-security/webhook-stream-authorization',
          to: '/guides/stream-security/webhook-stream-authorization/'
        },
        {
          from: '/get-started/enterprise-and-community-edition/',
          to: '/quick-start/'
        },
	{
          from: '/guides/recording-live-streams/s3-integration-http-forwarding/',
          to: '/category/s3-recording-and-integration/'
        },
	{
          from: '/category/rtmps/',
          to: '/guides/publish-live-stream/rtmp/rtmps/'
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/',
          to: '/category/react-native-sdk/'
        },
	{
          from: '/guides/recording-live-streams/',
          to: '/category/recording-live-streams/'
        },
	{
          from: '/guides/clustering-and-scaling/load-balancing/load-balancer-with-haproxy-ssl-termination/',
          to: '/guides/clustering-and-scaling/load-balancing/haproxy-load-balancer/'
        },
	{
          from: '/guides/advanced-usage/webhook-stream-authorization/',
          to: '/guides/stream-security/webhook-stream-authorization/'
        },
	{
          from: '/category/turn--stun-installation/',
          to: '/category/turn-server-installation/'
        },
	{
          from: '/guides/advanced-usage/turn-and-stun-installation/setting-up-turn-using-coturn/',
          to: '/category/turn-server-installation/'
        },
	{
          from: '/guides/publish-live-stream/introduction/',
          to: '/category/publish-live-stream/'
        },
	{
          from: '/guides/playing-live-stream/Embedded-Web-Player/',
          to: '/guides/developer-sdk-and-api/sdk-integration/embedded-sdk-guide/'
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/Unity-SDK/',
          to: '/guides/developer-sdk-and-api/sdk-integration/unity-sdk/'
        },
	{
          from: '/category/monitoring-ant-media-instance/',
          to: '/category/monitoring-solutions/'
        },
	{
          from: '/guides/upgrading-ant-media-server/',
          to: '/guides/installing-on-linux/upgrading-ant-media-server/'
        },
	{
          from: '/guides/publish-live-stream/Recording-live-streams/',
          to: '/category/recording-live-streams/'
        },
	{
          from: '/guides/publish-live-stream/WebRTC-WebSocket-Messaging-Reference/',
          to: '/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/'
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/iOS-SDK/',
          to: '/category/ios-sdk/'
        },
	{
          from: '/guides/playing-live-stream/WebRTC-Playing/',
          to: '/guides/playing-live-stream/webrtc-playback/'
        },
	{
          from: '/guides/installing-on-linux/Setting-up-SSL/',
          to: '/guides/installing-on-linux/setting-up-ssl/'
        },
	{
          from: '/Frequently-Asked-Questions/',
          to: '/faq/'
        },
	{
          from: '/guides/advanced-usage/building-ams-from-source-code/',
          to: '/guides/developing-antmedia-server/building-ams-from-source-code/'
        },
	{
          from: '/old-front-page/',
          to: '/quick-start/'
        },
	{
          from: '/guides/publish-live-stream/WebRTC/',
          to: '/guides/publish-live-stream/webrtc/'
        },
	{
          from: '/get-started/Security-and-privacy/',
          to: '/get-started/security-and-privacy/'
        },
	{
          from: '/guides/publish-live-stream/user-defined-scripts/',
          to: '/guides/recording-live-streams/user-defined-scripts/'
        },
	{
          from: '/get-started/introduction/',
          to: '/'
        },
	{
          from: '/guides/clustering-and-scaling/Kubernetes/Preparation-of-Kubernetes-Environment-for-AMS-Deployment/',
          to: '/guides/clustering-and-scaling/kubernetes/prepare-environment-to-deploy-ams-at-kubernetes/'
        },
	{
          from: '/ant-media-server-administration-guide/',
          to: '/get-started/user-management/'
        },
	{
          from: '/edge-server-configuration-guide/',
          to: '/guides/clustering-and-scaling/manual-configuration/cluster-installation/'
        },
	{
          from: '/guides/advanced-usage/Using-Intel-Quick-Sync/',
          to: '/category/advanced-usage/'
        },
	{
          from: '/guides/developer-sdk-and-api/rest-api-guide/REST-API-examples/',
          to: '/guides/developer-sdk-and-api/rest-api-guide/rest-apis-examples/'
        },
	{
          from: '/guides/advanced-usage/WebRTC-codecs/',
          to: '/guides/configuration-and-testing/video-codecs/'
        },
	{
          from: '/get-started/User-Management/',
          to: '/get-started/user-management/'
        },
	{
          from: '/guides/advanced-usage/using-nvidia-hardware-based-encoder-on-docker/',
          to: '/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/'
        },
	{
          from: '/guides/advanced-usage/circle-component-usage/',
          to: '/guides/developing-antmedia-server/circle-component-usage/'
        },
	{
          from: '/streaming-glossary/',
          to: '/category/guides/'
        },
	{
          from: '/guides/configuration-and-testing/AMS-application-configuration/',
          to: '/guides/configuration-and-testing/ams-application-configuration/'
        },
	{
          from: '/guides/advanced-usage/Plugins-for-Ant-Media-Server/',
          to: '/guides/developing-antmedia-server/plugins-for-ant-media-server/'
        },
	{
          from: '/guides/publish-live-stream/webrtc-peer-to-peer-communication/',
          to: '/guides/publish-live-stream/webrtc/webrtc-peer-to-peer-communication/',
        },
	{
          from: '/guides/advanced-usage/webrtc-codecs/',
          to: '/guides/configuration-and-testing/video-codecs/',
        },
	{
          from: [
            '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-p2p-sample/',
            '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-conference-sample/',
            '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-play-sample/',
	    '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-data-channel-sample/',
            '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-publish-sample/'
          ],
          to: '/category/webrtc-samples/'
        },
	{
          from: [
	    '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/download-react-native-samples/',
	    '/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-pre-requisite/'
	  ],
          to: '/category/getting-started/'
        },
	{
          from: '/guides/publish-live-stream/ip-cameras-and-external-resources/',
          to: '/category/ip-camera--stream-sources/',
        },
	{
          from: '/guides/advanced-usage/hls-aes-encryption/',
          to: '/guides/playing-live-stream/hls-playing/',
        },
	{
          from: '/guides/advanced-usage/stream-quality-filtering/',
          to: '/guides/configuration-and-testing/ams-application-configuration/',
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/flutter-sdk/',
          to: '/category/flutter-sdk/',
        },
	{
          from: '/guides/configuration-and-testing/decreasing-boot-time/',
          to: '/category/configuration--testing/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/running-ams-container-at-ecs/',
          to: '/guides/clustering-and-scaling/aws/aws-ecs/running-ams-container-at-ecs/',
        },
        {
          from: [
            '/guides/clustering-and-scaling/aws/aws-wavelength-standalone-deployment/',
            '/guides/clustering-and-scaling/aws/aws-wavelength-cluster-deployment/',
            '/guides/clustering-and-scaling/aws/deploying-ams-at-aws-wavelength/',
          ],
          to: '/category/aws-wavelength/'
        },
	{
          from: '/guides/clustering-and-scaling/aws/configuring-rtmp-lb-in-aws/',
          to: '/category/aws-load-balancer/',
        },
	{
          from: [
            '/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/',
	    '/guides/clustering-and-scaling/aws/updating-ams-with-cloudformation/',
	    '/guides/clustering-and-scaling/aws/ant-media-global-cluster-on-aws/',
	  ],
          to: '/category/aws-cloudformation/',
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/',
          to: '/category/javascript-sdk/',
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
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: false,
          },
/*
          {
            type: 'doc',
            docId: 'introduction',
            label: 'Guides',
            position: 'right'
          },
*/
          {
            label: 'SDK references',
            href: '/category/sdk-integration/',
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
	  {
            label: 'Free Trial',
            href: 'https://antmedia.io/self-hosted-free-trial/',
            position: 'right',
            className: 'navbar-free-trial',
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
    /*  announcementBar: {
        id: 'announcement-bar',
        content:
          `<div style="font-size:16px;">
          </div>`,
        backgroundColor: '#fff5bd',
        textColor: '#091E42',
        isCloseable: false,
      },*/
    }),
};

module.exports = config;
