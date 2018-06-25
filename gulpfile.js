var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

require('./gulp/build.js')(gulp, $);

require('./gulp/run.js')(gulp, $);

gulp.task('default', function (){
    return gulp.start('run');
});