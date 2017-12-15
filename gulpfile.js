//引入gulp
var gulp = require('gulp');
//引入组件
var jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	spriter = require('gulp-css-spriter'),
	notify = require('gulp-notify');
//检查脚本
gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglifyj())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message: 'js task complete'}));
});
//编译sass
gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safair 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('src/css'))
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		//.pipe(notify({message: 'sass complete'}));
});
gulp.task('css', function() {
    return gulp.src('src/css/main.css')//比如recharge.css这个样式里面什么都不用改，是你想要合并的图就要引用这个样式。
        .pipe(spriter({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': './src/img/spritesheet.png', //这是雪碧图自动合成的图。 很重要
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../img/spritesheet.png' //这是在css引用的图片路径，很重要
        }))
        .pipe(gulp.dest('./src/css')); //最后生成出来
});
//自动加载
//watch任务
gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', ['sass']); 
	//gulp.watch('src/js/**/*.js', ['js']);
	livereload.listen();
	gulp.watch(['dist/**']).on('change', livereload.changed);
});
//
//