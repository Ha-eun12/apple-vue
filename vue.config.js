// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pwa: {
    name: 'vuestargram',
    themeColor: '#4DBA87',
    msTileColor: '#000',

    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, 'index.html']
    },
  },
  publicPath: '/apple-vue',
}
