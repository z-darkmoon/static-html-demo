##static-html-demo
    本项目是一个基于原生项目模板,目的是为了解决项目压缩构建,发布,本地测试等;
###目录结构
```
    |--app 入口目录  
        |-- css 样式目录
        |-- img 图片目录
        |-- js js目录
        |-- lib 静态库目录
        index.html //项目入口页面
    |--config 配置js目录
        |--base.js 基础构建配置
    |--gulpfile.js 项目打包调试入口文件
    |--.babelrc 项目开发js版本
    |--package.json 项目依赖环境
    |--dist 项目构建输出目录
```    
####使用
1. 安装依赖环境   
   `npm install`  
   
2. 本地调试  
默认端口`npm run dev`  
指定端口`npm run  dev -- --port 9999`  
可以在base.js里设置端口号
3. 打包  
默认打包命令`npm run build` _暂时一个可以接入多个_
 ###注意事项
1. html 静态页面中  `<!-- build:css --> <!-- endbuild -->`   
  `<!-- build:js --><!-- endbuild -->`  不能删除要包括住对应的css引入跟js引入
 会在构建时,被对应压缩替换  jquery 这类js库要写到外部 
 
 例子:
 ```
      <!-- build:css -->
      <link rel="stylesheet" href="css/reset.css">
      <!-- endbuild -->
      <script src="lib/jquery-1.11.0.js"></script>

      <!-- build:js -->
      <script src="js/common.js"></script>
      <!-- endbuild -->
 ```
 2. css样式支持css与less两种方式
 3. 更多页面 可以直接在根目录或新建文件夹 只能编写html,所有js,css放到指定目录
    
