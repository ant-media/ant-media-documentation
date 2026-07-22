// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

import versions from './versions.json';

const isDev = process.env.NODE_ENV === 'development';

function isPrerelease(version) {
  return (
    version.includes('-') ||
    version.includes('alpha') ||
    version.includes('beta') ||
    version.includes('rc')
  );
}

function getLastStableVersion() {
  const lastStableVersion = versions.find((version) => !isPrerelease(version));
  if (!lastStableVersion) {
    throw new Error('unexpected, no stable Docusaurus version?');
  }
  return lastStableVersion;
}

function getNextVersionName() {
  return 'Next';
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ant Media Documentation',
  tagline: 'Ant Media Documentation',
  url: 'https://docs.antmedia.io',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'warn', // replace with 'throw' to stop building if broken links
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
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

  // One-time migration: older visits stored theme=light in localStorage, which
  // overrides defaultMode. Apply dark once, then respect the user's toggle.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        (function () {
          try {
            var flag = 'ams-docs-default-dark-v1';
            if (!localStorage.getItem(flag)) {
              localStorage.setItem('theme', 'dark');
              localStorage.setItem(flag, '1');
              document.documentElement.setAttribute('data-theme', 'dark');
              document.documentElement.setAttribute('data-theme-choice', 'dark');
            }
          } catch (e) {}
        })();
      `,
    },
  ],

  clientModules: [require.resolve('./src/clientModules/defaultDarkMode.js')],

scripts: [
    {
      src: "//code.tidio.co/rk0jjyc0mwbxjgimchdsnl4cwitetyvi.js",
      async: true,
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
          editUrl: 'https://github.com/ant-media/ant-media-documentation/edit/master/',
          lastVersion:
              isDev ? 'current' : getLastStableVersion(),
          onlyIncludeVersions: (() => {
                return [ ...(isDev ? ['current'] : []), ...versions.slice(0, 3)]; // return only the last 4 
            })(),
          versions: {
             current: {
                label: `${getNextVersionName()} 🚧`,
              },
          },
          // Flatten Guides + Get Started into top-level sidebar items, and place
          // Security and Privacy after FAQ for a clearer onboarding flow.
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const items = await defaultSidebarItemsGenerator(args);

            const getStartedOrder = [
              'features',
              'user-management',
              'sample-tools-and-applications',
            ];

            const itemKey = (item) =>
              `${item.docId || ''} ${item.href || ''} ${item.id || ''} ${item.label || ''}`.toLowerCase();

            const isSecurity = (item) => itemKey(item).includes('security-and-privacy');
            const isFaq = (item) =>
              itemKey(item).includes('faq') ||
              (item.label || '').toLowerCase().includes('frequently asked');

            const sortGetStarted = (children) => {
              const rank = (item) => {
                const key = itemKey(item);
                const idx = getStartedOrder.findIndex((id) => key.includes(id));
                return idx === -1 ? 999 : idx;
              };
              return [...children].sort((a, b) => rank(a) - rank(b));
            };

            let securityItem = null;
            const flattened = [];

            for (const item of items) {
              if (item.type === 'category' && item.label === 'Guides') {
                flattened.push(...(item.items ?? []));
                continue;
              }
              if (item.type === 'category' && item.label === 'Get Started') {
                const children = item.items ?? [];
                const rest = [];
                for (const child of children) {
                  if (isSecurity(child)) {
                    securityItem = child;
                  } else {
                    rest.push(child);
                  }
                }
                flattened.push(...sortGetStarted(rest));
                continue;
              }
              flattened.push(item);
            }

            if (securityItem) {
              const faqIdx = flattened.findIndex(isFaq);
              if (faqIdx >= 0) {
                flattened.splice(faqIdx + 1, 0, securityItem);
              } else {
                flattened.push(securityItem);
              }
            }

            return flattened;
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
    languages: ['en'],
    // Index the latest-version homepage (`/`). Without this, only older
    // versioned home pages (`/2.17/`, `/2.16/`) appear for "Introduction".
    indexBaseUrl: true,
    // Give ranking room after we prefer latest-version hits in SearchBar.
    maxHits: 10,
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
          to: '/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/'
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
          from: '/guides/advanced-usage/stream-security/',
          to: '/category/stream-security/'
        },
	{
          from: '/guides/advanced-usage/monitoring/monitoring-ams-with-datadog/',
          to: '/category/monitoring/'
        },
	{
          from: '/guides/monitoring/monitoring-ams-with-datadog/',
          to: '/category/monitoring/'
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
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-aws-eks/',
          to: '/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/'
        },
	{
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-azure-aks/',
          to: '/guides/clustering-and-scaling/kubernetes/installing-ams-on-azure-aks/'
        },
	{
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-google-gke/',
          to: '/guides/clustering-and-scaling/kubernetes/installing-ams-on-google-gke/'
        },
	{
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-services/install-ams-at-digital-ocean/',
          to: '/guides/clustering-and-scaling/kubernetes/install-ams-at-digital-ocean/'
        },
	{
          from: '/category/kubernetes-services/',
          to: '/category/kubernetes/'
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
          from: '/guides/configuration-and-testing/load-testing/webrtc-load-testing/',
          to: '/guides/load-testing/webrtc-load-testing/',
        },
	{
          from: '/guides/configuration-and-testing/load-testing/hls-load-testing/',
          to: '/guides/load-testing/hls-load-testing/',
        },
	{
          from: '/guides/configuration-and-testing/load-testing/rtmp-load-testing/',
          to: '/guides/load-testing/rtmp-load-testing/',
        },
	{
          from: '/guides/configuration-and-testing/load-testing/rtsp-load-testing/',
          to: '/guides/load-testing/rtsp-load-testing/',
        },
	{
          from: '/guides/configuration-and-testing/load-testing/srt-loadt-testing/',
          to: '/guides/load-testing/srt-loadt-testing/',
        },
	{
          from: '/guides/configuration-and-testing/webrtc-load-testing/',
          to: '/category/load-testing/'
        },
	// Versioned load-testing moves (3.0 latest is unversioned)
	...['2.17', '2.16'].flatMap((ver) => [
          {
            from: `/${ver}/guides/configuration-and-testing/load-testing/`,
            to: `/${ver}/category/load-testing/`,
          },
          {
            from: `/${ver}/guides/configuration-and-testing/load-testing/webrtc-load-testing/`,
            to: `/${ver}/guides/load-testing/webrtc-load-testing/`,
          },
          {
            from: `/${ver}/guides/configuration-and-testing/load-testing/hls-load-testing/`,
            to: `/${ver}/guides/load-testing/hls-load-testing/`,
          },
          {
            from: `/${ver}/guides/configuration-and-testing/load-testing/rtmp-load-testing/`,
            to: `/${ver}/guides/load-testing/rtmp-load-testing/`,
          },
          {
            from: `/${ver}/guides/configuration-and-testing/load-testing/srt-loadt-testing/`,
            to: `/${ver}/guides/load-testing/srt-loadt-testing/`,
          },
        ]),
	{
          from: '/3.0/guides/configuration-and-testing/load-testing/',
          to: '/category/load-testing/',
        },
	{
          from: '/3.0/guides/configuration-and-testing/load-testing/webrtc-load-testing/',
          to: '/guides/load-testing/webrtc-load-testing/',
        },
	{
          from: '/3.0/guides/configuration-and-testing/load-testing/hls-load-testing/',
          to: '/guides/load-testing/hls-load-testing/',
        },
	{
          from: '/3.0/guides/configuration-and-testing/load-testing/rtmp-load-testing/',
          to: '/guides/load-testing/rtmp-load-testing/',
        },
	{
          from: '/3.0/guides/configuration-and-testing/load-testing/rtsp-load-testing/',
          to: '/guides/load-testing/rtsp-load-testing/',
        },
	{
          from: '/3.0/guides/configuration-and-testing/load-testing/srt-loadt-testing/',
          to: '/guides/load-testing/srt-loadt-testing/',
        },
	{
          from: '/2.17/guides/configuration-and-testing/load-testing/rtsp-load-testing/',
          to: '/2.17/guides/load-testing/rtsp-load-testing/',
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
          to: '/get-started/features/'
        },
	{
          from: '/category/get-started/',
          to: '/get-started/features/'
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
          from: '/guides/clustering-and-scaling/kubernetes/kubernetes-autoscaling/',
          to: '/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/'
        },
	{
          from: '/guides/configuration-and-testing/configuring-stun-addresses/',
          to: '/guides/configuration-and-testing/configuring-stun-turn-addresses/'
        },
	{
          from: '/guides/advanced-usage/turn-installation/configuring-stun-turn-addresses/',
          to: '/guides/configuration-and-testing/configuring-stun-turn-addresses/',
        },
	{
          from: '/3.0/guides/advanced-usage/turn-installation/configuring-stun-turn-addresses/',
          to: '/guides/configuration-and-testing/configuring-stun-turn-addresses/',
        },
	{
          from: '/guides/advanced-usage/turn-and-stun-installation/coturn-quick-installation/',
          to: '/guides/advanced-usage/turn-installation/coturn-quick-installation/'
        },
	// Push Notification moved under Developer SDKs & API
	...(() => {
          // Overview doc is served at the folder URL (not .../push-notification-management/push-notification-management/).
          const pushPages = [
            'Android SDK/configure-ant-media-server/',
            'Android SDK/configure-manifest/',
            'Android SDK/create-android-project/',
            'Android SDK/create-required-classes/',
            'Android SDK/dependency/',
            'Android SDK/sending-notification/',
            'Android SDK/setting-up-firebase/',
            'iOS SDK/configure-ant-media-server/',
            'iOS SDK/configure-your-ios-project/',
            'iOS SDK/prerequirements/',
            'iOS SDK/sending-notification/',
            'iOS SDK/setting-up-apn-certificates/',
          ];
          const redirects = [
            {
              from: '/guides/developing-antmedia-server/push-notification-management/',
              to: '/category/push-notification/',
            },
            {
              from: '/guides/developing-antmedia-server/push-notification-management/push-notification-management/',
              to: '/guides/developer-sdk-and-api/push-notification-management/',
            },
            {
              from: '/3.0/guides/developing-antmedia-server/push-notification-management/',
              to: '/category/push-notification/',
            },
            {
              from: '/3.0/guides/developing-antmedia-server/push-notification-management/push-notification-management/',
              to: '/guides/developer-sdk-and-api/push-notification-management/',
            },
            {
              from: '/2.17/guides/developing-antmedia-server/push-notification-management/',
              to: '/2.17/category/push-notification/',
            },
            {
              from: '/2.17/guides/developing-antmedia-server/push-notification-management/push-notification-management/',
              to: '/2.17/guides/developer-sdk-and-api/push-notification-management/',
            },
            {
              from: '/2.16/guides/developing-antmedia-server/push-notification-management/',
              to: '/2.16/category/push-notification/',
            },
            {
              from: '/2.16/guides/developing-antmedia-server/push-notification-management/push-notification-management/',
              to: '/2.16/guides/developer-sdk-and-api/push-notification-management/',
            },
          ];
          for (const page of pushPages) {
            redirects.push({
              from: `/guides/developing-antmedia-server/push-notification-management/${page}`,
              to: `/guides/developer-sdk-and-api/push-notification-management/${page}`,
            });
            redirects.push({
              from: `/3.0/guides/developing-antmedia-server/push-notification-management/${page}`,
              to: `/guides/developer-sdk-and-api/push-notification-management/${page}`,
            });
            redirects.push({
              from: `/2.17/guides/developing-antmedia-server/push-notification-management/${page}`,
              to: `/2.17/guides/developer-sdk-and-api/push-notification-management/${page}`,
            });
            redirects.push({
              from: `/2.16/guides/developing-antmedia-server/push-notification-management/${page}`,
              to: `/2.16/guides/developer-sdk-and-api/push-notification-management/${page}`,
            });
          }
          return redirects;
        })(),
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
          to: '/category/publish-live-streams/'
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
          to: '/category/monitoring/'
        },
	{
          from: '/category/monitoring-solutions/',
          to: '/category/monitoring/'
        },
	{
          from: '/category/publish-live-stream/',
          to: '/category/publish-live-streams/'
        },
	{
          from: '/category/installing-on-linux/',
          to: '/category/installation/'
        },
	{
          from: '/category/configuration--testing/',
          to: '/category/configuration/'
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
          to: '/guides/developer-sdk-and-api/extend-the-server/building-ams-from-source-code/'
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
          from: '/get-started/User-Management/',
          to: '/get-started/user-management/'
        },
	{
          from: '/guides/advanced-usage/using-nvidia-hardware-based-encoder-on-docker/',
          to: '/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/'
        },
	{
          from: '/guides/advanced-usage/circle-component-usage/',
          to: '/guides/developer-sdk-and-api/extend-the-server/applications/circle-component-usage/'
        },
	{
          from: '/streaming-glossary/',
          to: '/category/installation/'
        },
	{
          from: '/category/guides/',
          to: '/category/installation/'
        },
	{
          from: '/guides/configuration-and-testing/AMS-application-configuration/',
          to: '/guides/configuration-and-testing/ams-application-configuration/'
        },
	{
          from: '/guides/advanced-usage/Plugins-for-Ant-Media-Server/',
          to: '/guides/developer-sdk-and-api/extend-the-server/plugins/plugins-for-ant-media-server/'
        },
	{
          from: '/guides/publish-live-stream/webrtc-peer-to-peer-communication/',
          to: '/guides/publish-live-stream/webrtc/webrtc-peer-to-peer-communication/',
        },
	{
          from: '/guides/advanced-usage/webrtc-codecs/',
          to: '/guides/configuration-and-testing/video-codec/',
        },
	{
          from: '/guides/configuration-and-testing/video-codecs/',
          to: '/guides/configuration-and-testing/video-codec/',
        },
	{
          // 3.0 is lastVersion (served unversioned); keep /3.0/ bookmarks working.
          from: '/3.0/guides/configuration-and-testing/video-codecs/',
          to: '/guides/configuration-and-testing/video-codec/',
        },
	{
          from: '/2.17/guides/configuration-and-testing/video-codecs/',
          to: '/2.17/guides/configuration-and-testing/video-codec/',
        },
	// 2.16 still has video-codecs.md — do not redirect that version.
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
          to: '/category/configuration/',
        },
	{
          // Historical flat AWS doc URLs → current nested paths
          from: '/guides/clustering-and-scaling/aws/running-ams-container-at-ecs/',
          to: '/guides/clustering-and-scaling/aws/aws-ecs/running-ams-container-at-ecs/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/scaling-at-aws-ecs-fargate/',
          to: '/guides/clustering-and-scaling/aws/aws-ecs/scaling-at-aws-ecs-fargate/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/configuring-rtmp-lb-in-aws/',
          to: '/guides/clustering-and-scaling/aws/aws-lb/configuring-rtmp-lb-in-aws/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/enabling-ip-filtering-behind-load-balancer-in-aws/',
          to: '/guides/clustering-and-scaling/aws/aws-lb/enabling-ip-filtering-behind-load-balancer-in-aws/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/',
          to: '/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-aws-cloudformation/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/updating-ams-with-cloudformation/',
          to: '/guides/clustering-and-scaling/aws/aws-cloudformation/updating-ams-with-cloudformation/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/ant-media-global-cluster-on-aws/',
          to: '/guides/clustering-and-scaling/aws/aws-cloudformation/ant-media-global-cluster-on-aws/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/auto-managed-service-on-aws/',
          to: '/guides/clustering-and-scaling/aws/aws-auto-managed/auto-managed-service-on-aws/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/scale-with-self-hosted-license/',
          to: '/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-self-hosted-license/',
        },
	// Versioned docs: kubernetes-services flattened + self-hosted moved under CloudFormation.
	// Latest stable (3.0) is served without a version prefix, so redirect targets must omit it.
	...['3.0', '2.17', '2.16'].flatMap((ver) => {
          const toPrefix = ver === getLastStableVersion() ? '' : `/${ver}`;
          return [
            {
              from: `/${ver}/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-aws-eks/`,
              to: `${toPrefix}/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/`,
            },
            {
              from: `/${ver}/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-azure-aks/`,
              to: `${toPrefix}/guides/clustering-and-scaling/kubernetes/installing-ams-on-azure-aks/`,
            },
            {
              from: `/${ver}/guides/clustering-and-scaling/kubernetes/kubernetes-services/installing-ams-on-google-gke/`,
              to: `${toPrefix}/guides/clustering-and-scaling/kubernetes/installing-ams-on-google-gke/`,
            },
            {
              from: `/${ver}/guides/clustering-and-scaling/kubernetes/kubernetes-services/install-ams-at-digital-ocean/`,
              to: `${toPrefix}/guides/clustering-and-scaling/kubernetes/install-ams-at-digital-ocean/`,
            },
            {
              from: `/${ver}/guides/clustering-and-scaling/aws/scale-with-self-hosted-license/`,
              to: `${toPrefix}/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-self-hosted-license/`,
            },
          ];
        }),
	{
          from: '/guides/clustering-and-scaling/aws/deploying-ams-at-aws-wavelength/',
          to: '/guides/clustering-and-scaling/aws/aws-wavelenght/deploying-ams-at-aws-wavelength/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/aws-wavelength-standalone-deployment/',
          to: '/guides/clustering-and-scaling/aws/aws-wavelenght/aws-wavelength-standalone-deployment/',
        },
	{
          from: '/guides/clustering-and-scaling/aws/aws-wavelength-cluster-deployment/',
          to: '/guides/clustering-and-scaling/aws/aws-wavelenght/aws-wavelength-cluster-deployment/',
        },
	{
          from: '/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/',
          to: '/category/javascript-sdk/',
        },
	// Developer Guides section: nest former server-extension docs + move Webhooks
	...(() => {
          const nestedPages = [
            'building-ams-from-source-code/',
            'applications/circle-component-usage/',
            'applications/create-new-application/',
            'plugins/developing-plugins/',
            'plugins/getting-started/',
            'plugins/plugin-architecture/',
            'plugins/plugins-for-ant-media-server/',
          ];
          // 2.16 kept a flatter developing-antmedia-server layout
          const flat216Pages = [
            'building-ams-from-source-code/',
            'circle-component-usage/',
            'create-new-application/',
            'introduction-plugin-structure/',
            'plugins-for-ant-media-server/',
          ];
          const redirects = [
            // Old "Developer SDKs & API" category → unified Developer Guides
            {
              from: '/category/developer-sdks--api/',
              to: '/category/developer-guides/',
            },
            {
              from: '/category/developer-sdks-api/',
              to: '/category/developer-guides/',
            },
            {
              // Brief intermediate slug from prior rename
              from: '/category/developers/',
              to: '/category/developer-guides/',
            },
            {
              from: '/guides/advanced-usage/webhooks/',
              to: '/guides/developer-sdk-and-api/webhooks/',
            },
            {
              from: '/3.0/guides/advanced-usage/webhooks/',
              to: '/guides/developer-sdk-and-api/webhooks/',
            },
            {
              from: '/2.17/guides/advanced-usage/webhooks/',
              to: '/2.17/guides/developer-sdk-and-api/webhooks/',
            },
            {
              from: '/2.16/guides/advanced-usage/webhooks/',
              to: '/2.16/guides/developer-sdk-and-api/webhooks/',
            },
            {
              from: '/guides/developing-antmedia-server/',
              to: '/category/extend-the-server/',
            },
            {
              from: '/3.0/guides/developing-antmedia-server/',
              to: '/category/extend-the-server/',
            },
            {
              from: '/2.17/guides/developing-antmedia-server/',
              to: '/2.17/category/extend-the-server/',
            },
            {
              from: '/2.16/guides/developing-antmedia-server/',
              to: '/2.16/category/extend-the-server/',
            },
            // Short paths used in older absolute links
            {
              from: '/guides/developing-antmedia-server/create-new-application/',
              to: '/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/',
            },
            {
              from: '/3.0/guides/developing-antmedia-server/create-new-application/',
              to: '/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/',
            },
            {
              from: '/2.17/guides/developing-antmedia-server/create-new-application/',
              to: '/2.17/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/',
            },
            {
              from: '/guides/developing-antmedia-server/circle-component-usage/',
              to: '/guides/developer-sdk-and-api/extend-the-server/applications/circle-component-usage/',
            },
            {
              from: '/3.0/guides/developing-antmedia-server/circle-component-usage/',
              to: '/guides/developer-sdk-and-api/extend-the-server/applications/circle-component-usage/',
            },
            {
              from: '/2.17/guides/developing-antmedia-server/circle-component-usage/',
              to: '/2.17/guides/developer-sdk-and-api/extend-the-server/applications/circle-component-usage/',
            },
          ];
          for (const page of nestedPages) {
            redirects.push({
              from: `/guides/developing-antmedia-server/${page}`,
              to: `/guides/developer-sdk-and-api/extend-the-server/${page}`,
            });
            redirects.push({
              from: `/3.0/guides/developing-antmedia-server/${page}`,
              to: `/guides/developer-sdk-and-api/extend-the-server/${page}`,
            });
            redirects.push({
              from: `/2.17/guides/developing-antmedia-server/${page}`,
              to: `/2.17/guides/developer-sdk-and-api/extend-the-server/${page}`,
            });
          }
          for (const page of flat216Pages) {
            redirects.push({
              from: `/2.16/guides/developing-antmedia-server/${page}`,
              to: `/2.16/guides/developer-sdk-and-api/extend-the-server/${page}`,
            });
          }
          return redirects;
        })(),
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

  themes: ['@docusaurus/theme-mermaid'],

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
          {
            label: 'Release Notes',
            href: 'https://github.com/ant-media/Ant-Media-Server/releases',
            position: 'right',
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
            href: '/category/developer-guides/',
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
        defaultMode: 'dark',
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
        additionalLanguages: ['java', 'bash', 'json', 'yaml'],
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
