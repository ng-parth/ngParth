/**
 * Created by parthm on 23/07/16.
 */

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
            .pipe(cleanCSS({debug: true}, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(gulp.dest('dist'));
});


//TODO: Add SCSS plugin and to generate CSS file from SCSS file
//TODO: Minify and combine CSS
//TODO: Minify and combine JS
//TODO: Minify index
//TODO: Insert minified JS,CSS in index
//TODO: Add a build task which will follow above task and create a production-ready build folder ready to deploy.
