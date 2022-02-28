////////////////////////////////////
// plugins
////////////////////////////////////
// gulp
const gulp = require('gulp');
const fs = require('fs');
const minimist = require('minimist');
// const sourcemaps = require('gulp-sourcemaps');

// css
// （gulp-sass 4系）
const cssSass = require('gulp-sass')(require('sass'));
// （gulp-sass 4系）
// const cssSass = require('gulp-sass');
// Dart Sass（gulp-sass 4系）
// cssSass.compiler = require('sass');
// Node Sass（gulp-sass 4系）
// cssSass.compiler = require('sass');
const fibers = require('fibers');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');
const cssnano = require('cssnano');
const sassGlob = require('gulp-sass-glob-use-forward');
const postcssCustomProperties = require('postcss-custom-properties');

// ejs
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const htmlbeautify = require('gulp-html-beautify');

// js
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// ts
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// jsimport文解決
const browserify = require('browserify');
const through2 = require('through2');
const babelify = require('babelify');
// const source = require('vinyl-source-stream');

// img
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

// del&copy
const del = require('del');

// watch
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// autoreload
const browserSync = require('browser-sync');

////////////////////////////////////
// paths
////////////////////////////////////
const src = {
  root: './src',
  html: './src/**/*.html',
  ejs: './src/ejs/**/*.ejs',
  include: '!./src/ejs/**/*._ejs',
  sass: './src/assets/css/**/*.scss',
  js: './src/assets/js/**/*.js',
  tsEntryFile: './src/assets/js/**/common.ts',
  ts: './src/assets/js/**/*.ts',
  json: './src/assets/data/**/*.json',
  img: './src/assets/img/**/*.{png,jpg,gif,svg}',
};

const dist = {
  temp: './_temp/',
  root: './dist/',
  html: './dist/**/*.html',
  css: './dist/assets/css/',
  js: './dist/assets/js/',
  jsEntryFile: './dist/assets/js/index.js',
  json: './dist/assets/data/',
  img: './dist/assets/img/',
};

const scriptEnv = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: 'default' },
});
const isMin = scriptEnv.env === 'min';
console.log('isMin:', isMin);

////////////////////////////////////
// settings
////////////////////////////////////
////////// task for html //////////
// browserSync
const bs = (cb) => {
  browserSync.init({
    // server: ["dist", "min"],
    server: {
      baseDir: 'dist',
      index: 'index.html',
    },
    files: '**/*.html',
    port: 3000,
    reloadOnRestart: true,
  });
  cb();
};
// exports.bs = bs;

// browser reload
const reload = (cb) => {
  setTimeout(() => {
    browserSync.reload();
    cb();
  }, 0);
};
// exports.reload = reload;

// html copy
const htmlcopy = (cb) => {
  gulp.src([src.html, '!./dist/include/*.html'], { base: 'src/**' }).pipe(gulp.dest(dist.root + '**/'));
  cb();
};
// exports.htmlcopy = htmlcopy;

////////// task for ejs //////////

const buildEjs = (cb) => {
  let json = JSON.parse(fs.readFileSync('./src/assets/data/head.json'));
  gulp
    .src([src.ejs, src.include, '!./src/assets/data/*.json'])
    .pipe(plumber({ errorHandler: notify.onError('EJS Error: <%= error.message %>>') }))
    .pipe(ejs({ json }, {}, { ext: '.html' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
    // .pipe(changed(dist.root))
    .pipe(gulp.dest('./_temp'));
  cb();
};
// exports.buildEjs = buildEjs;

const htmlBeautify = (cb) => {
  const options = {
    indent_size: 2,
    indent_with_tabs: true,
    preserve_newlines: false,
  };
  setTimeout(() => {
    gulp.src(['./_temp/**/*.html', '!./_temp/include/*.html']).pipe(htmlbeautify(options)).pipe(gulp.dest(dist.root));
    cb();
  }, 1000);
};
// exports.htmlBeautify = htmlBeautify;

////////// task for scss //////////
const Sass = (cb) => {
  const plugins = [autoprefixer({ grid: 'autoplace' }), cssDeclarationSorter({ order: 'smacss' }), postcssCustomProperties({})];
  gulp
    .src(src.sass)
    .pipe(plumber({ errorHandler: notify.onError('SASS Error: <%= error.message %>>') }))
    .pipe(sassGlob())
    // gulp-sass 5系
    .pipe(cssSass({ outputStyle: 'expanded' }))
    // Dart Sassの場合（gulp-sass 4系）
    .pipe(cssSass({ fiber: fibers, outputStyle: 'expanded' }))
    // Node Sassの場合（gulp-sass 4系）
    // .pipe(cssSass({ outputStyle: 'expanded' }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(dist.css));
  cb();
};
// exports.Sass = Sass;

const min_Sass = (cb) => {
  const plugins = [autoprefixer({ grid: 'autoplace' }), cssDeclarationSorter({ order: 'smacss' })];
  const minify = [cssnano({ autoprefixer: false })];
  gulp
    .src(src.sass)
    .pipe(plumber({ errorHandler: notify.onError('min_Sass Error: <%= error.message %>>') }))
    .pipe(sassGlob())
    // Dart Sassの場合
    .pipe(cssSass({ fiber: fibers, outputStyle: 'expanded' }))
    // Node Sassの場合
    // .pipe(cssSass({ outputStyle: 'expanded' }))
    .pipe(postcss(plugins))
    .pipe(changed(dist.root))
    .pipe(postcss(minify))
    .pipe(gulp.dest(dist.css));
  cb();
};
// exports.min_Sass = min_Sass;

////////// task for img //////////
const imgmin = (cb) => {
  gulp
    .src(src.img)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(changed(dist.root))
    .pipe(
      imagemin([
        imageminPngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.gifsicle({
          interlaced: false,
          optimizationLevel: 1,
          colors: 256,
        }),
        imagemin.svgo({
          // removeViewBox: false,
        }),
      ])
    )
    .pipe(gulp.dest(dist.img));
  cb();
};
// exports.imgmin = imgmin;

////////// task for js //////////
const typeScript = (cb) => {
  gulp
    .src([src.ts])
    // .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: notify.onError('typeScript Error: <%= error.message %>>') }))
    .pipe(tsProject({}))
    .on('error', function (e) {
      console.log('typeScriptのエラー:', e);
    })
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-async-to-generator'],
        comments: false,
      })
    )
    .pipe(changed(dist.root))
    // .pipe(sourcemaps.write('.', { sourceRoot: './src', includeContent: false }))
    .pipe(gulp.dest(dist.js));
  cb();
};
// exports.typeScript = typeScript;

const Babel = (cb) => {
  gulp
    .src([src.js, '!./src/assets/js/vendor/*.js'])
    .pipe(plumber({ errorHandler: notify.onError('Babel Error: <%= error.message %>>') }))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        comments: false,
      })
    )
    .pipe(changed(dist.root))
    .pipe(gulp.dest(dist.js));
  cb();
};
// exports.Babel = Babel;

const bundleTs = (cd) => {
  setTimeout(() => {
    gulp
      .src([`${dist.jsEntryFile}`])
      .pipe(plumber({ errorHandler: notify.onError('bundleTs Error: <%= error.message %>>') }))
      .pipe(
        through2.obj(function (file, encode, callback) {
          // fileにはsrcで読み込んだファイルの情報が引き渡される
          // file.pathを利用してbrowserifyインスタンスを生成する
          browserify(file.path)
            .transform(babelify, { presets: ['@babel/preset-env'] })
            .bundle(function (err, res) {
              // bundleを実行し，処理結果でcontentsを上書きする
              file.contents = res;
              // callbackを実行し，次の処理にfileを引き渡す
              // nullになっている部分はエラー情報
              callback(null, file);
            });
        })
      )
      // .pipe(source('bundle.js'))
      .pipe(gulp.dest(dist.js));
    cd();
  }, 300);
};
// exports.bundleTs = bundleTs;

// function bundle(cb) {
//   gulp
//     .src(['./dist/assets/js/index.js'])
//     .pipe(browserify())
//     .pipe(plumber({ errorHandler: notify.onError('bundle Error: <%= error.message %>>') }))
//     .on('error', function (e) {
//       console.log(e);
//     })
//     .pipe(source('bundle.js'))
//     .pipe(changed(dist.root))
//     .pipe(gulp.dest(dist.js));
//   cb();
// }
// exports.bundle = bundle;

const copyJson = (cb) => {
  gulp.src([src.json]).pipe(changed(dist.root)).pipe(gulp.dest(dist.json));
  cb();
};
// exports.copyJson = copyJson;

const min_js = (cb) => {
  gulp
    .src([dist.js + '**.js', '!./dist/assets/js/vendor/*.js'])
    .pipe(plumber({ errorHandler: notify.onError('min_js Error: <%= error.message %>>') }))
    .pipe(
      uglify({
        compress: {
          drop_console: true,
        },
      })
    )
    .on('error', function (e) {
      console.log(e);
    })
    .pipe(gulp.dest(dist.js));
  cb();
};
// exports.min_js = min_js;

////////// task for del&copy //////////
const clean = (cb) => {
  del.sync([dist.root, dist.temp], { force: true });
  cb();
};
// exports.clean = clean;

const copy = (cb) => {
  gulp.src([src.root + '/**/*.*', '!src/**/*.scss', '!src/**/*.ejs', '!src/**/*.ts'], { base: src.root }).pipe(gulp.dest(dist.root));
  cb();
};
// exports.copy = copy;

const buildDel = (cb) => {
  del.sync([`${dist.js}modules/`]);
  cb();
};
// exports.buildDel = buildDel;

////////// task for watch //////////
const watch = (cb) => {
  gulp.watch(src.html, gulp.series(htmlcopy, htmlBeautify, reload));
  gulp.watch(src.ejs, gulp.series(buildEjs, htmlBeautify, reload));
  gulp.watch(src.ts, gulp.series(typeScript, bundleTs, reload));
  gulp.watch(src.js, gulp.series(Babel, reload));
  gulp.watch(src.json, gulp.series(copyJson, buildEjs, htmlBeautify, reload));
  gulp.watch(src.sass, gulp.series(Sass, reload));
  gulp.watch(src.img, gulp.series(imgmin, reload));
  cb();
};
// exports.watch = watch;

////////////////////////////////////
// default task
////////////////////////////////////
exports.default = gulp.series(clean, copy, watch, Sass, imgmin, htmlcopy, buildEjs, typeScript, Babel, copyJson, htmlBeautify, bs);
exports.buildResouces = gulp.series(min_Sass, min_js, bs, buildDel);
