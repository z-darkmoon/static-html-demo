//所有路径事项对于入口目录
//所有配置都是可选项
var ENV={
    port: '8088',//自定义端口 默认值9989
    inPutPath:'./app',//入口目录
    outPutPath:'./dist',//构建输出目录 默认 dist/,
    cssPath:'/css/',//css路径 默认app/css
    imgPath:'/img/',//图片路径 默认app/img
    mainJsPath:'/js/',//主js 默认app/js
    libJsPath:'/lib/',//静态库js 默认app/lib
    subPagePath:[],//子页面路径 默认所有目录下的html文件
    staticFiles: ['json'],//静态资源 后缀名
};
module.exports={
    ...ENV,
    proxyTable: {
        '/back':{
            target: 'http://example.com/',
            changeOrigin:true
        },
    }
};