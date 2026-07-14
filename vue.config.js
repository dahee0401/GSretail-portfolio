const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    devServer: {
        historyApiFallback: true
    },
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === "production"
        ? "/GSretail-portfolio/"
        : "/",
    outputDir: "docs",

    chainWebpack: config => {
        config.module
            .rule('pdf')
            .test(/\.pdf$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/download/[name].[hash:8].[ext]',
                esModule: false
            })
    }
})
