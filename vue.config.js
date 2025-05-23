const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
   configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')  // '@' işaretini src klasörüne bağlar
      }
    }
  }
})
