module.exports = {
    lintOnSave: false,
    devServer: {
        open: process.platform === 'darwin',
        host: '192.168.2.136',
        port: 8080,
        https: false,
        hot: true,
        hotOnly: false,
        // 配置多个代理
        proxy: {
            "/api": {
                target: "http://api.tbk.dingdanxia.com", // 要访问的接口域名
                ws: true, // 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    "^/api": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
                }
            }
        },

    },

};