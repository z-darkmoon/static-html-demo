var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject');

var runType = argv.run || ''; // dev、build
var env = require('../config/base.js');
module.exports = function (gulp, $) {
    gulp.task('dev', ['less', 'connect', 'watch']);

    var baseTask = [ 'movecss', 'moveimages', 'moveother','getJs','mainJs','movestatic','libJs','replacehtml'];
    var replace = ['revHtmlImg1', 'revJsImg1', 'revCssImg1', 'revJsonImg1','revHtmlJs1'];
    var revTask = ['revHtmlImg', 'revJsImg', 'revCssImg', 'revJsonImg','revHtmlJs'];

    gulp.task('build', function () {
        if (env.replace.mode) {
            runSequence (baseTask, replace, revTask);
        }else {
            runSequence (baseTask, revTask);
        }
    });
    gulp.task('dev-live', ['clean','movelive','less', 'connect','watch-live']);
    gulp.task('run', ['clean'], function () {

        switch (runType) {
            case 'build':
                gulp.start('build'); //--打包
            break;
            case 'dev-live':
                gulp.start('dev-live'); //--打包测试
                break;
            case 'build-test':
                gulp.start('build'); //--打包测试
                break;
            default:
                gulp.start('dev'); //----开发调试任务启动
        }

    });

};