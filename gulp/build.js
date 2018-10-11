var fs   = require('fs'),
    argv = require('yargs').argv,
    babel=require('gulp-babel'),
    path=require('path'),
    stripDebug = require('gulp-strip-debug'),
    htmlMin=require('gulp-htmlmin'),
    imgMin=require('gulp-imagemin'),
    rev=require('gulp-rev'),
    revCollector=require('gulp-rev-collector'),
    os   = require('os'),
    less   = require('gulp-less'),
    proxy = require('http-proxy-middleware');

var env = require('../config/base.js');
var baseEnv = require('./env');
var runType = argv.run || '', // dev、build
    rootPath = env.inPutPath || baseEnv.inPutPath,
    outPutPath = env.outPutPath || baseEnv.outPutPath,
    cssPath = env.cssPath || baseEnv.cssPath,
    imgPath = env.imgPath || baseEnv.imgPath,
    jsPath = env.jsPath || baseEnv.jsPath,
    libPath = env.libPath || baseEnv.libPath,
    staticFiles = env.staticFiles || baseEnv.staticFiles,
    replace = env.replace,
    freeMode = env.freeMode || baseEnv.freeMode;
    miniHtml = !env.miniHtml ? false : baseEnv.miniHtml;
    netPath     = '',
    d           = new Date(),
    version     = d.getTime(),
    veros       = os.platform()
    pre = [];
switch (runType) {
    case 'build':
        netPort = argv.port ||env.port || baseEnv.port;
        netPath = outPutPath;
    break;
    case 'dev-live':
        netPort = argv.port || env.port || baseEnv.port;
        netPath = outPutPath='.tmp/';
        pre = ['movelive'];
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
        if (runType =='dev') {
            return;
        }else if(runType =='dev-live') {
            return gulp.src([
                outPutPath,
                '/.tmp/',
                // '/dist/*'
            ], {read: false})
            // .pipe($.clean());
                .pipe($.rimraf({ force: true }));
        }else {
            return gulp.src([
                outPutPath,
                // '/.tmp/',
                '/dist/*'
            ], {read: false})
            // .pipe($.clean());
                .pipe($.rimraf({ force: true }));
        }

    });


    gulp.task('connect',pre, function() {

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

    gulp.task('watch-live', function() {

        $.livereload.listen();
        $.watch(rootPath+cssPath+'*.less', function() {
            var out = rootPath+cssPath;
            if (runType=='dev-live') {
                out = outPutPath + cssPath;
            }
            gulp.src( rootPath+cssPath+'*.less')
            // .pipe($.plumber())
                .pipe(less())
                // .pipe($.autoprefixer('last 3 version'))
                .pipe($.size({
                    title: 'css--------------------------------'
                }))
                .pipe(gulp.dest(out))
                .pipe($.livereload());
        });
        $.watch(rootPath+'/**/*.js', function () {
            return  gulp.src(rootPath+'/**/*.js')
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe($.uglify())
                .pipe(gulp.dest(outPutPath))
                .pipe($.livereload());
        });
            // .pipe($.livereload());
        $.watch([ rootPath+'/**/*.html', ], function () {})
            .pipe($.livereload());

    });
    gulp.task('movelive',function () {
        console.log(rootPath);
        return gulp.src(rootPath+'/**/*')
            .pipe(gulp.dest(outPutPath));
    })

    //--html js 替换
    gulp.task('replacehtml', function() {
        var jsFiles = [
            ...jsLib,
            '/main-v'+version+'.js'
        ];

        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: miniHtml,//压缩HTML
            // collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            // removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            // removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            // removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
            minifyJS: miniHtml,//压缩页面JS
            minifyCSS: miniHtml//压缩页面CSS
        };
        var result = gulp.src(rootPath + '/**/*.html');
        if (!freeMode) {
            return result.pipe($.htmlReplace({
                'css': '/css/all_v' + version + '.css',
                // 'css': 'videogular.css',
                'js': jsFiles,

            }))
                .pipe($.replace(/\(\$cssVersion\)/g, 'all_v' + version))
                .pipe(htmlMin(options))
                .pipe(gulp.dest(outPutPath));
        }else {
            return result.pipe(htmlMin(options))
                .pipe(gulp.dest(outPutPath));
        }

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
    });
    //压缩主js
    gulp.task('mainJs',function () {
        var result = gulp.src(rootPath + jsPath + '*.js');
        var out = outPutPath + jsPath;
        if (!freeMode) {
            out = outPutPath ;
            return result.pipe($.concat('main-v' + version + '.js'))
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(stripDebug())
                .pipe($.uglify())
                // .pipe(rev())
                .pipe(gulp.dest(out))
                // .pipe(rev.manifest())
                // .pipe(gulp.dest(out));
        }else {
            return result.pipe(babel({
                presets: ['es2015']
            }))
                .pipe(stripDebug())
                .pipe($.uglify())
                .pipe(rev())
                .pipe(gulp.dest(out))
                .pipe(rev.manifest())
                .pipe(gulp.dest(out));
        }


    });
    //压缩js库
    gulp.task('libJs',function () {
        return gulp.src(rootPath+libPath+'*.js')
            // .pipe($.concat('lib-v'+version+'.js'))
            .pipe($.uglify())
            // .pipe(rev())
            // .pipe(gulp.dest(outPutPath+libPath))
            // .pipe(rev.manifest())
            .pipe(gulp.dest(outPutPath+libPath));
    });
    //--css 迁移
    gulp.task('movecss',['less'], function() {
        var result=gulp.src([
            rootPath + '/**/*.css',
            '!' + rootPath + '/static/**/*.css'
        ]);
        if (!freeMode) {
            return result.pipe($.concat('all_v' + version + '.css'))
                .pipe($.minifyCss())
                .pipe(gulp.dest(outPutPath + cssPath));
        }else {
            return result.pipe($.minifyCss())
                .pipe(gulp.dest(outPutPath));
        }

    });
    //--image 迁移
    gulp.task('moveimages', function() {
        return gulp.src([
            rootPath + '/**/*.jpg',
            rootPath + '/**/*.png',
            '!.' + rootPath + '/static/**/*',
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
    gulp.task('movestatic',function () {
        return gulp.src(rootPath+'/static/**/*')
            .pipe(gulp.dest(outPutPath+'/static/'));
    });
    //静态库js 图片
    var revHtmlTaskGroup = [
        {
            taskName: 'revHtmlImg',
            jsonDest: outPutPath+imgPath+'*.json',
            entryPath: outPutPath+'/**/*.html',
            viewDest: outPutPath
        },
        // {
        //     taskName: 'revHtmlJs',
        //     jsonDest: outPutPath+libPath+'*.json',
        //     entryPath: outPutPath+'/**/*.html',
        //     viewDest: outPutPath
        // },
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
        },
        {
            taskName: 'revHtmlJs',
            jsonDest:  outPutPath+jsPath+'*.json',
            entryPath: outPutPath + '/**/*.html',
            viewDest: outPutPath
        }
    ];
    revHtmlTaskGroup.forEach(function (task) {
        createRevHtmlTask(task.taskName, task.jsonDest, task.entryPath, task.viewDest)
    });
    if (freeMode) {

    }
    function createRevHtmlTask(taskName, jsonDest, entryPath, viewDest) {
        gulp.task(taskName+1,function () {

            var reg ;
            var result = gulp.src(entryPath);
            if(replace.mode&&taskName !='revHtmlJs') {
                for (var i=0;i<replace.valueType.length;i++) {
                    reg=new RegExp(replace.valueType[i].key,'g');
                    result.pipe($.replace(reg,replace.valueType[i].value))
                        .pipe(gulp.dest(viewDest));
                }
                return result;
            }
        });
        gulp.task(taskName, function () {
            return gulp.src([jsonDest, entryPath,'!./dist/static/**/*'])
                .pipe(revCollector())
                .pipe(gulp.dest(viewDest));
        });
    }
};
