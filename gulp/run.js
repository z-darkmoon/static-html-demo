var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject');

var runType = argv.run || ''; // dev、build
module.exports = function (gulp, $) {
    gulp.task('dev', ['less', 'connect', 'watch']);


    gulp.task('build', function () {
        runSequence(
            [ 'movecss', 'moveimages', 'moveother','getJs','mainJs','libJs'],
            ['replacehtml'],
            'revHtmlImg',
            'revJsImg',
            'revCssImg',
            'revHtmlJs',
            'revJsonImg'
        );
    });


    gulp.task('run', ['clean'], function () {

        switch (runType) {
            case 'build':
                gulp.start('build'); //--打包
            break;
            case 'build-test':
                gulp.start('build'); //--打包测试
                break;
            default:
                gulp.start('dev'); //----开发调试任务启动
        }

    });

};