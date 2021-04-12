const CracoLessPlugin = require('craco-less')
const { ESLINT_MODES } = require('@craco/craco')

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#d43742' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
