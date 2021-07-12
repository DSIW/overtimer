const withPWA = require('next-pwa')
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = withPWA({
  pwa: {
    dest: 'public'
  }
})

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
