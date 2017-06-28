//引入gulp
var gulp = require('gulp');
//引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//检查脚本
gulp.task('lint',function(){
	gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
//编译sass
gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'));
});
//scripts压缩合并，重命名
gulp.task('scripts', function() {
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})
//watch任务
gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', ['sass']); 
})
//
//