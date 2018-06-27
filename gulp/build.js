var fs   = require('fs'),
    argv = require('yargs').argv,
    babel=require('gulp-babel'),
    path=require('path'),
    stripDebug = require('gulp-strip-debug'),
    htmlMin=require('gulp-minify-html'),
    imgMin=require('gulp-imagemin'),
    rev=require('gulp-rev'),
    revCollector=require('gulp-rev-collector'),
    os   = require('os'),
    less   = require('gulp-less'),
    proxy = require('http-proxy-middleware');

var env = require('../config/base.js');
var baseEnv = require('./env');
var runType = argv.run || '', // dev、build
    rootPath=env.inPutPath || baseEnv.inPutPath,
    outPutPath=env.outPutPath || baseEnv.outPutPath,
    cssPath = env.cssPath ||baseEnv.cssPath,
    imgPath = env.imgPath ||baseEnv.imgPath,
    jsPath = env.jsPath || baseEnv.jsPath,
    libPath = env.libPath || baseEnv.libPath,
    staticFiles = env.staticFiles || baseEnv.staticFiles,
    netPath     = '',
    d           = new Date(),
    version     = d.getTime(),
    veros       = os.platform();
switch (runType) {
    case 'build':
        netPort = argv.port ||env.port || 8888;
        netPath = outPutPath;
    break;
    default: //--dev
        netPort = argv.port ||env.port || baseEnv.port;
        netPath = rootPath;
}
module.exports = function (gulp, $) {

    gulp.task('less', function() {

        return gulp.src(rootPath+cssPath+'*.less')
            // .pipe($.plumber())
            .pipe(less())
            // .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({
                title: 'css--------------------------------'
            }))
            .pipe(gulp.dest(rootPath+cssPath));
    });


    gulp.task('clean', function() {
        if (runType !='build') {
            return;
        }
        return gulp.src([
                outPutPath,
                './.tmp',
                '/dist/*'
            ], {read: false})
            // .pipe($.clean());
            .pipe($.rimraf({ force: true }));
    });


    gulp.task('connect', function() {

        var url = '';

        $.connect.server({
            root: netPath,
            port: netPort,
            livereload: true,
            middleware: function(connect, opt) {
                let table = [];
                for (let index in env.proxyTable) {
                    table.push(proxy(index,env.proxyTable[index]))
                }
                return table;
            }
        });

        switch (veros) {
            case 'win32':
                url = 'start http://localhost:' + netPort;
            break;

            case 'darwin':
                url = 'open http://localhost:' + netPort;
            break;
        }

        gulp.src('')
            .pipe($.shell(url));
    });
    

    gulp.task('watch', function() {

        $.livereload.listen();
        $.watch(rootPath+cssPath+'*.less', function() {
            gulp.src( rootPath+cssPath+'*.less')
                // .pipe($.plumber())
                .pipe(less())
                // .pipe($.autoprefixer('last 3 version'))
                .pipe($.size({
                    title: 'css--------------------------------'
                }))
                .pipe(gulp.dest(rootPath+cssPath))
                .pipe($.livereload());
        });
        $.watch([ rootPath+'/**/*.html', rootPath+'/**/*.js'], function () {})
            .pipe($.livereload());

    });


    //--JS 注入到页面中
    gulp.task('inject', function() {
        return gulp.src('./app/index.html')
            .pipe(
                $.inject(
                    gulp.src([
                            './app/**/*.js',
                            '!./**/app.js',
                        ], 
                        {read: false}), {relative: true}
                )
            )
            .pipe(gulp.dest(rootPath));
    });

    
    //--html js 替换
    gulp.task('replacehtml', function() {
        var jsFiles = [
            ...jsLib,
            '/main-v'+version+'.js'
        ];

        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            // removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            // removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        return gulp.src(rootPath+'/**/*.html')
            .pipe($.htmlReplace({
                'css': '/css/all_v' + version + '.css',
                // 'css': 'videogular.css',
                'js': jsFiles,

            }))
            .pipe($.replace(/\(\$cssVersion\)/g, 'all_v' + version))
            .pipe(htmlMin(options))
            .pipe(gulp.dest(outPutPath));
    });
    var jsLib = [];
    //获取静态js名称
    gulp.task('getJs',function () {
        fs.readdir(process.cwd() +rootPath+libPath, function (err, files) {
            if (err) {
                return;
            }
            files.forEach(function (filename) {
                if (!/^\./.test(filename)) {
                    jsLib.push(libPath+filename)
                }
            })
        });
        // return jsLib;
    })
    //压缩主js
    gulp.task('mainJs',function () {
        return  gulp.src(rootPath+jsPath+'*.js')
            .pipe($.concat('main-v'+version+'.js'))
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(stripDebug())
            .pipe($.uglify())
            .pipe(gulp.dest(outPutPath));
    });
    //压缩js库
    gulp.task('libJs',function () {
        return gulp.src(rootPath+libPath+'*.js')
            // .pipe($.concat('lib-v'+version+'.js'))
            .pipe($.uglify())
            .pipe(rev())
            .pipe(gulp.dest(outPutPath+libPath))
            .pipe(rev.manifest())
            .pipe(gulp.dest(outPutPath+libPath));
    });
    //--css 迁移
    gulp.task('movecss',['less'], function() {
        return gulp.src([
                rootPath+'/**/*.css',
            ])
            .pipe($.concat('all_v'+version +'.css'))
            .pipe($.minifyCss())
            .pipe(gulp.dest(outPutPath+cssPath));
    });
    //--image 迁移
    gulp.task('moveimages', function() {
        return gulp.src([
            rootPath + '/**/*.jpg',
            rootPath + '/**/*.png',
            '!' + rootPath + '/themes/temp/**/*',
            '!.' + rootPath + '/themes/logo/**/*'
        ])
            .pipe(imgMin({optimizationLevel: 3, progressive: true, interlaced: true}))
            .pipe(rev())
            .pipe(gulp.dest(outPutPath))
            .pipe(rev.manifest())
            .pipe(gulp.dest(outPutPath+imgPath));
    });
    //--其他静态资源 迁移
    gulp.task('moveother', function() {
        var arr = [];
        for (var i=0;i<staticFiles.length;i++) {
            arr.push(rootPath + '/**/*.' + staticFiles[i]);
        }
        return gulp.src(arr)
            .pipe(gulp.dest(outPutPath));
    });
    //静态库js 图片
    var revHtmlTaskGroup = [
        {
            taskName: 'revHtmlImg',
            jsonDest: outPutPath+imgPath+'*.json',
            entryPath: outPutPath+'/**/*.html',
            viewDest: outPutPath
        },
        {
            taskName: 'revHtmlJs',
            jsonDest: outPutPath+libPath+'*.json',
            entryPath: outPutPath+'/**/*.html',
            viewDest: outPutPath
        },
        {
            taskName: 'revJsImg',
            jsonDest: outPutPath+imgPath+'*.json',
            entryPath: outPutPath+'/**/*.js',
            viewDest: outPutPath
        },
        {
            taskName: 'revCssImg',
            jsonDest:  outPutPath+imgPath+'*.json',
            entryPath: outPutPath+cssPath+'**/*.css',
            viewDest: outPutPath+cssPath
        },
        {
            taskName: 'revJsonImg',
            jsonDest:  outPutPath+imgPath+'*.json',
            entryPath: outPutPath+'/**/*.json',
            viewDest: outPutPath
        }
    ];
    revHtmlTaskGroup.forEach(function (task) {
        createRevHtmlTask(task.taskName, task.jsonDest, task.entryPath, task.viewDest)
    });
    function createRevHtmlTask(taskName, jsonDest, entryPath, viewDest) {
        gulp.task(taskName, function () {
            // var viewDest = paths.dist.view;
            return gulp.src([jsonDest, entryPath])
                .pipe(revCollector())
                .pipe(gulp.dest(viewDest));
        });
    }
};
