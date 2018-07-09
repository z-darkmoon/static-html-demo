var env = {
    port: '8080',//自定义端口 默认值9989
    inPutPath:'./app',//入口目录
    outPutPath:'./dist',//构建输出目录 默认 dist/,
    cssPath:'/css/',//css路径 默认app/css
    imgPath:'/img/',//图片路径 默认app/img
    jsPath:'/js/',//主js 默认app/js
    libPath:'/static/js/',//静态库js 默认app/static/js/
    subPagePath:[],//子页面路径 默认所有目录下的html文件
    staticFiles: ['json'],//静态资源 后缀名
    //todo  自由模式 实时模式 待开发
    freeMode:false,//自由模式 默认false  打开后js css 将只被压缩 不进行合并
    liveMode:false,//实时模式  默认false 打开后 js 将被实时压缩渲染 es6==>es5
    // replace:{//资源替换 将本地资源 替换成  线上资源 此模式  所有资源必须使用 绝对路径:/img/***.png
    //     mode:false,//默认false  不开启
    //     valueType:[
    //         {
    //             key:'/img/',
    //             value:'https://***4444***/img/'
    //         },
    //         {
    //             key:'/lib/',
    //             value:'https://***3333***/img/'
    //         }] //存储替换的对应数据  /img/==>http://***
    // },
    // proxyTable: {
    //     '/back':{
    //         target: 'http://example.com/',
    //         changeOrigin:true
    //     },
    // }
};

module.exports = env;