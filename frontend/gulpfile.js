var gulp 		= require ( 'gulp' ),
	sass 		= require ( 'gulp-sass' ),
	concat 		= require ( 'gulp-concat' ),
	livereload 	= require ( 'gulp-livereload' ),
	i18next 	= require ( 'i18next-parser' ),
	nodemon 	= require ( 'gulp-nodemon' )


/**
 * $ gulp i18next
 *
 * description: retira variavéis dos template para internacionalização
 */
gulp.task ( 'i18next', function()
{
	gulp
		.src ( 'public/templates/**' )
		.pipe ( i18next ({
			locales: ['en', 'de'],
			parser: /{@get\stext="((?:[^"\\]|\\.)*)"\s+\/}|{@get\stext='((?:[^'\\]|\\.)*)'\s+\/}/,
			output: '../locales'
		}))
		.pipe ( gulp.dest ( 'locales' ) )
})

/**
 * $ gulp server
 *
 * description: inicializa o server e reinicia caso algum arquivo reelevante seja alterado
 */
gulp.task ( 'server', function()
{
	nodemon ({
		script: './bin/www',
		ext: 'js html dust',
		ignore: [
			'src/js/',
			'node_modules/',
			'public/js/',
			'gulpfile.js'
		],
		env: { 'NODE_ENV': 'development' }
	})
})

/**
 * $ gulp styles
 *
 * description: compila arquivos SASS e o colocam na pasta correta
 */
gulp.task ( 'styles', function()
{
	gulp
		.src ( 'src/scss/**/*.scss' )
		.pipe ( sass () )
		.pipe ( gulp.dest ( 'public/css' ) )
		.pipe ( livereload () )
})

/**
 * $ gulp scripts
 *
 * description: concatena arquivos .js e o colocam nas pastas corretas
 */
gulp.task ( 'scripts', function()
{
	gulp
		.src ([
			'src/js/plugins/jquery-3.2.1.js',
			'src/js/index.js'
		])
		.pipe ( concat ( 'index.js' ) )
		.pipe ( gulp.dest ( 'public/js' ) )
		.pipe ( livereload () )

	gulp
		.src([
			'src/js/plugins/jquery-3.2.1.js',
			'src/js/plugins/materialize.js',
			'src/js/admin/index.js'
		])
		.pipe( concat ( 'index.js' ) )
		.pipe( gulp.dest ( 'public/js/admin' ) )
		.pipe( livereload () )

	gulp
		.src([
			'src/js/plugins/jquery-3.2.1.js',
			'src/js/plugins/materialize.js',
			'src/js/login.js'
		])
		.pipe( concat ( 'login.js' ) )
		.pipe( gulp.dest ( 'public/js/admin' ) )
		.pipe( livereload () )
})

/**
 * $ gulp watch
 *
 * description: monitora arquivos SCSS, JS fontes
 */
gulp.task ( 'watch', function()
{
	livereload.listen ()
	gulp.watch ( 'src/scss/**/*.scss', [ 'styles' ] )
	gulp.watch ( 'src/js/**/*.js', [ 'scripts' ] )
})

/**
 * $ gulp default
 *
 * description: inicializa o monitoramento completo dos arquivos
 */
gulp.task ( 'default', [ 'watch', 'server' ] )
