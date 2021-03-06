const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function css() {
    return src('sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('css'))
        .pipe(browserSync.stream())
}

function images() {
    return src('images/*')
        .pipe(minifyImg())
        .pipe(dest('dist/images'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./images/*', images);
}

exports.default = watch;