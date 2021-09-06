const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const webpack = require('webpack');
const optimizedImages = require('next-optimized-images');
const withOffline = require('next-offline');
const withManifest = require('next-manifest');
const path = require('path');

module.exports = withPlugins(
  [
    [
      withManifest,
      {
        manifest: {
          output: './src/static/',
          short_name: 'Access | PWA',
          name: 'Access | Progressive Web App',
          icons: [
            {
              rel: 'icon',
              src: '/static/favicons/android-icon-36x36.png',
              sizes: '36x36',
              type: 'image/png',
              density: '0.75',
            },
            {
              rel: 'icon',
              src: '/static/favicons/android-icon-48x48.png',
              sizes: '48x48',
              type: 'image/png',
              density: '1.0',
            },
            {
              rel: 'icon',
              src: '/static/favicons/android-icon-72x72.png',
              sizes: '72x72',
              type: 'image/png',
              density: '1.5',
            },
            {
              rel: 'icon',
              src: '/static/favicons/android-icon-96x96.png',
              sizes: '96x96',
              type: 'image/png',
              density: '2.0',
            },
            {
              rel: 'icon',
              src: '/static/favicons/android-icon-144x144.png',
              sizes: '144x144',
              type: 'image/png',
              density: '3.0',
            },
            {
              rel: 'icon',
              src: '/static/favicons/android-icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              density: '4.0',
            },
          ],
          start_url: '/',
          background_color: '#282c2f',
          display: 'fullscreen',
          scope: '/',
          theme_color: '#282c2f',
          orientation: 'portrait',
        },
      },
    ],
    withBundleAnalyzer,
    [
      withOffline,
      {
        generateSw: true,
        dontAutoRegisterSw: false,
        workboxOpts: {
          swDest: 'service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'offlineCache',
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        },
      },
    ],
    [
      optimizedImages,
      {
        imagesName: '[name].[ext]',
        svgo: {
          plugins: [
            {
              removeXMLNS: true,
              removeOffCanvasPaths: true,
              removeScriptElement: true,
              reusePaths: true,
            },
          ],
        },
      },
    ],
  ],
  {
    exportTrailingSlash: true,
    webpack: (config, options) => {
      config.plugins.push(
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|de/),
      );

      config.module.rules.push({
        include: /access-pwa-styleguide/,
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              presets: ['@babel/typescript'],
              extends: path.join(__dirname, '.babelrc.js'),
            },
          },
        ],
      });

      /** Fix for several same modules in bundle */
      config.resolve.alias['styled-components'] = path.resolve(
        __dirname,
        'node_modules',
        'styled-components',
      );

      config.resolve.alias['@material-ui/styles'] = path.resolve(
        __dirname,
        'node_modules',
        '@material-ui/styles',
      );

      config.resolve.alias['@material-ui/core'] = path.resolve(
        __dirname,
        'node_modules',
        '@material-ui/core',
      );

      if (process.env.REACT_PROFILER === 'enable') {
        config.resolve.alias = {
          ...config.resolve.alias,
          'react-dom': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        };
      }

      return config;
    },
    env: {
      NEXT_STATIC_BACKEND_URL: process.env.NEXT_STATIC_BACKEND_URL,
    },
  },
);
