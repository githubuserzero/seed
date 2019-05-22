const {patchStorybookWebpackConfig} = require('react-zeroconfig');

module.exports = async ({config}) => {
  patchStorybookWebpackConfig({config});
  return config;
};