// include gulp
var gulp = require('gulp');

// include plugins using gulp-load-plugins (retrieves plugins from package.json file)
var plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
        replaceString: /\bgulp[\-.]/
    });
var dest = "public/";

// using main-bower-files plugin get build js files from bower directory and minify
gulp.task('libs', function() {
    var jsFiles = ['src/js/*'];
    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'libs'));
});

// get custom js files, merge in to 1 file and minify
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'js'));
});

// get all less files, merge in to 1 file and minify
gulp.task('css', function() {
    return gulp.src('src/styles/**/*.less')
        .pipe(plugins.less())
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(dest + 'css'));
});

// set watch on js and less files to fire tasks on change
gulp.task('watch', function() {
    gulp.watch('src/libs/*.js', ['libs']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.less', ['css']);
});

// default task
gulp.task('default', ['libs', 'scripts', 'css', 'watch']);
