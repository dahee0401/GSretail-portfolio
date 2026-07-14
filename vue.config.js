const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    devServer: {
        historyApiFallback: true
    },
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: "/",     // 루트 경로 기준
    outputDir: "docs",    // 빌드 결과물 폴더

    // PDF 로더 설정 추가
    // vue.config.js 수정
    chainWebpack: config => {
        config.module
            .rule('pdf')
            .test(/\.pdf$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/download/[name].[hash:8].[ext]',
                esModule: false // 이 설정을 추가하면 .default 없이 바로 경로를 가져옵니다.
            })
    }
})