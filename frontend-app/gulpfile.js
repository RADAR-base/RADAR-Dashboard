 var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gulpif = require('gulp-if');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
/* Images */
var imagemin = require('gulp-imagemin');
/* Mixed */
var ext_replace = require('gulp-ext-replace');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';


// gulp-if allows to use optimised tasks for development and production environments
//var env = process.env.NODE_ENV || 'development';
var env = 'production';
var tsProject = typescript.createProject('tsconfig.json');


gulp.task('build-sass', function(){
    // sass configurations
    var config = {};
    if(env === 'development'){
        config.sourceComments = 'map';
    }
    if(env === 'production'){
        // minify
        config.outputStyle = 'compressed';
    }

    return gulp.src(appDev +'sass/main.sass')
                .pipe(sass(config))
                .pipe(gulp.dest(appProd + '/css'))
                .pipe(connect.reload());
});

gulp.task('build-ts', function () {
    return gulp.src(appDev + 'typescript/**/*.ts')
        //.pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(jsuglify())
        //.pipe(sourcemaps.write())
        //.pipe(gulpif(env === 'production', jsuglify()))
        .pipe(gulp.dest(appProd+'app/'))
        .pipe(connect.reload());
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'imgages/**/*')
        //.pipe(imagemin({
        //    progressive: true
        //}))
        .pipe(gulp.dest(appProd + 'imgs/'))
        .pipe(connect.reload());
});

gulp.task('build-svg', function () {
    return gulp.src(assetsDev + 'images/**/*.svg')
        .pipe(gulp.dest(appProd + 'imgs/'))
        .pipe(connect.reload());
});

gulp.task('build-html', function () {
    return gulp.src(appDev+'jade/partials/**/*.jade')
                .pipe(jade())
                .pipe(gulp.dest(appProd + '/views/'))
                .pipe(connect.reload());
});

gulp.task('build-index', function () {
    return gulp.src(appDev+'jade/index.jade')
                .pipe(jade())
                .pipe(gulp.dest(appProd))
                .pipe(connect.reload());
});



gulp.task('watch', function () {
    gulp.watch(appDev + 'jade/partials/*.jade', ['build-html']);
    gulp.watch(appDev + 'jade/*.jade', ['build-index']);
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + 'sass/**/*.sass', ['build-sass']);
    gulp.watch(assetsDev + 'images/**/*', ['build-img', 'build-svg']);
});

gulp.task('connect', function(){
    connect.server({
        root: ['./'+appProd],
        livereload: true,
        port: 3000,
        open: {browser: 'Safari 8', file: 'index.html'}
    });
});

gulp.task('default', ['build-html','build-index', 'build-ts',
                        'build-sass', 'build-img', 'build-svg', 'watch']);
