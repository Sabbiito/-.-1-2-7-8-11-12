/** @type {import('@storybook/react-webpack5').StorybookConfig} */
const path = require('path');

const config = {

  stories: ['../../src/**/*.stories.@(js|jsx)'],

  addons: ['@storybook/preset-create-react-app', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  webpackFinal: async (webpackConfig) => {

    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.modules = [
      path.resolve(__dirname, '../node_modules'),
      ...(webpackConfig.resolve.modules || []),
    ];

    const projectSrc = path.resolve(__dirname, '../../src');

    const extendBabelInclude = (rule) => {
      if (!rule || typeof rule !== 'object') return;

      const isBabelLoader =
          typeof rule.loader === 'string' && /[/\\]babel-loader[/\\]/.test(rule.loader);

      if (isBabelLoader) {
        const currentInclude = Array.isArray(rule.include)
            ? rule.include
            : [rule.include].filter(Boolean);
        rule.include = [...currentInclude, projectSrc];
      }

      if (Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach(extendBabelInclude);
      }
    };

    (webpackConfig.module?.rules || []).forEach(extendBabelInclude);

    return webpackConfig;
  },
};

module.exports = config;
