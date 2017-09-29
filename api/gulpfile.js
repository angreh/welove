var gulp 		= require ( 'gulp' ),
	nodemon 	= require ( 'gulp-nodemon' )


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
 * $ gulp default
 *
 * description: inicializa o monitoramento completo dos arquivos
 */
gulp.task ( 'default', [ 'server' ] )