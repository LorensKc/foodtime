'use strict';

// GULP ♥ Import Modules

import gulp from 'gulp';
import watch from 'gulp-watch';
import prefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import less from 'gulp-less';
import sourcemaps from 'gulp-sourcemaps';
import rigger from 'gulp-rigger';
import cssmin from 'gulp-minify-css';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import rimraf from 'rimraf';
import babel from 'gulp-babel';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import concat from 'gulp-concat';

// GULP ♥ Object Paths

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        styles: 'build/styles/',
        images: 'build/images/',
        fonts: 'build/styles/fonts/',
        images_styles: 'build/styles/images'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/app.js',
        styles: 'src/styles/**/*.less',
        images: 'src/images/**/*.*',
        fonts: 'src/styles/fonts/**/*.*',
        images_styles: 'src/styles/images/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        styles: 'src/styles/**/*.scss',
        images: 'src/images/**/*.*',
        fonts: 'src/styles/fonts/**/*.*',
        images_styles: 'src/styles/images/**/*.*'
    },
    clean: './build'
};

// GULP ♥ Clean Task

gulp.task('clean', (cb) => {
    rimraf(path.clean, cb);
});

// GULP ♥ Html Task

gulp.task('html:build', () => {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

// GULP ♥ Styles Task

gulp.task('styles:build', () => {
    gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(concat('app.min.css'))
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.styles));
});

// GULP ♥ Fonts Task

gulp.task('fonts:build', () => {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// GULP ♥ Images Task

gulp.task('images:build', () => {
    gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.images));
});

// GULP ♥ Images Styles Task

gulp.task('images_styles:build', () => {
    gulp.src(path.src.images_styles)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.images_styles));
});

// GULP ♥ ES6 Task

gulp.task('js:build', () => {
    return browserify('./src/js/app.js', {debug: true, extensions: ['es6']})
        .transform('babelify', { presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(rigger())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js));
});

// GULP ♥ Array Build Tasks

gulp.task('build', [
    'html:build',
    'js:build',
    'styles:build',
    'fonts:build',
    'images:build',
    'images_styles:build'
]);

// GULP ♥ Watch Build Tasks

gulp.task('watch', () => {
    watch([path.watch.html], (event, cb) => {
        gulp.start('html:build');
    });
    watch([path.watch.styles], (event, cb) => {
        gulp.start('styles:build');
    });
    watch([path.watch.js], (event, cb) => {
        gulp.start('js:build');
    });
    watch([path.watch.images], (event, cb) => {
        gulp.start('images:build');
    });
    watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts:build');
    });
    watch([path.watch.images_styles], (event, cb) => {
        gulp.start('images_styles:build');
    });
});

// GULP ♥ Default Task

gulp.task('default', ['build', 'watch']);