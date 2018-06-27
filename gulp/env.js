var env = {
    port: '8080',//自定义端口 默认值9989
    inPutPath:'./app',//入口目录
    outPutPath:'./dist',//构建输出目录 默认 dist/,
    cssPath:'/css/',//css路径 默认app/css
    imgPath:'/img/',//图片路径 默认app/img
    jsPath:'/js/',//主js 默认app/js
    libJsPath:'/lib/',//静态库js 默认app/lib
    subPagePath:[],//子页面路径 默认所有目录下的html文件
    staticFiles: ['json'],//静态资源 后缀名
};

module.exports = env;