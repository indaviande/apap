import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import purgeCss from 'gulp-purgecss';
import tailwindcss from 'tailwindcss';
import atimport from 'postcss-import';
import del from 'del';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
const PRODUCTION = yargs.argv.prod;

const server = browserSync.create();

export const clean = () => del(['static']);

gulp.task('purgecss', () => {
	return gulp
		.src('src/**/*.css')
		.pipe(
			purgecss({
				content: ['src/**/*.html']
			})
		)
		.pipe(gulp.dest('build/css'));
});

export const styles = () => {
	return src('src/scss/app.scss')
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(
			postcss([atimport(), tailwindcss('./tailwind.config.js'), postcssPresetEnv({ stage: 1 })])
		)
		.pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
		.pipe(gulpif(PRODUCTION, cleanCss({ compatibility: 'ie8' })))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(
			purgecss({
				content: ['themes/apap/**/*.html']
			})
		)
		.pipe(dest('static/css'))
		.pipe(server.stream());
};
export const images = () => {
	return src(['src/images/*.{jpg,jpeg,png,svg,gif}', 'src/images/**/*.{jpg,jpeg,png,svg,gif}'])
		.pipe(gulpif(PRODUCTION, imagemin()))
		.pipe(dest('static/images'));
};
export const copy = () => {
	return src(['src/**/*', '!src/{images,js,scss,css}', '!src/{images,js,scss,css}/**/*']).pipe(
		dest('static')
	);
};
export const watchForChanges = () => {
	watch('src/scss/**/*.scss', styles);
	watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', series(images));
	watch(['src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*'], series(copy));
};

export const dev = series(clean, parallel(styles, images, copy), watchForChanges);
export const build = series(clean, parallel(styles, images, copy));
export default dev;
