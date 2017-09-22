'use strict'

var
	express = 		require ( 'express' ),
	path = 			require ( 'path' ),
	favicon = 		require ( 'serve-favicon' ),
	logger = 		require ( 'morgan' ),
	cookieParser = 	require ( 'cookie-parser' ),
	bodyParser = 	require ( 'body-parser' ),
	methodOverride= require ( 'method-override' ),
	adaro = 		require ( 'adaro' ),
	fs = 			require ( 'fs' ),
	flash = 		require ( 'connect-flash' )

const
	i18next = 		require ( 'i18next' ),
	i18nextMid = 	require ( 'i18next-express-middleware' ),
	Backend = 		require ( 'i18next-node-fs-backend' )


var app = express ()

// i18next: start
i18next
	.use ( Backend )
	.use ( i18nextMid.LanguageDetector )
	.init ({
		backend: {
			loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
			addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
		},
		fallbackLng: 'en',
		preload: [ 'en', 'de' ],
		saveMissing: true
	})
app.use ( i18nextMid.handle ( i18next ) )
// i18next: end

// Adaro/Dustjs: start
// Criando Helper para o Dustjs funcionar junto com o i18next
var options = {
	helpers: [ ( dust ) => {
		dust.helpers.get = ( chunk, context, bodies, params ) => {
			return chunk.write ( context.options.locals.t( params.text ) )
		}
	}]
}
app.engine ( 'dust', adaro.dust ( options ) )
app.set ( 'view engine', 'dust' )
app.set ( 'views', 'src/templates' )
// Adaro/Dustjs: end

// ExpressJS: start
app.use ( favicon ( path.join ( __dirname, 'public', 'favicon.ico' ) ) )
app.use ( logger ( 'dev' ) )
app.use ( bodyParser.json () )
app.use ( bodyParser.urlencoded ( { extended: false } ) )
app.use ( cookieParser () )
app.use ( express.static ( path.join ( __dirname, 'public' ) ) )
// ExpressJS: end

// Connect-flash: start
app.use ( flash () )
app.use ( ( req, res, next ) => {
	res.locals.messages = require ( 'express-messages' )( req, res )
	next ()
})
// Using flash message with DustJS style
// Parece meio um hack, mas foi o que eu vi um rapaz fazendo na internet
// https://gist.github.com/swaj/4958515
app.use ( ( req, res, next ) => {

	res.locals.flash = () => {

		var result = req.flash(),
			prop,
			messages = [],
			count

		if ( !Object.keys ( result ).length ) return undefined

		for ( prop in result )
		{
			if ( result.hasOwnProperty ( prop ) && result[prop].length )
			{
				for ( count = 0; count < result[prop].length; count += 1 )
				{
					messages.push ({
						"type": prop,
						"msg": result[prop][count]
					})
				}
			}
		}

		return messages
	}

	next ()
})
// Connect-flash: end

// Method-override: start
app.use( methodOverride ( function ( req, res )
{
	if (
		req.body &&
		typeof req.body === 'object' &&
		'_method' in req.body
	)
	{
    	var method = req.body._method
    	delete req.body._method
    	return method
  	}
}))
// Method-override: end

// Routers includer: start
// Script para definição de rotas automáticas
var routerRegister = function ( dir, fileList = [] )
{
	fs.readdirSync ( dir ).forEach ( function ( file )
	{
		const filePath = path.join( dir, file )

		if ( fs.statSync( filePath ).isDirectory() )
		{
			routerRegister ( filePath )
		}
		else
		{
			var rota = ( filePath == 'routes/index.js' ) ? '/' : filePath.slice ( 6,-3 )
			app.use (
				rota,
				require ( './' + filePath.slice ( 0,-3 ) )
			)
		}
	})
}
routerRegister ( 'routes' )
// Routers includer: start

// catch 404 and forward to error handler
app.use ( function ( req, res, next )
{
	var err = new Error ('Not Found')
	err.status = 404
	next ( err )
})

// error handler
app.use ( function ( err, req, res, next )
{
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get ('env') === 'development' ? err : {}

	// render the error page
	res.status ( err.status || 500 )
	res.render ( 'error' )
})

module.exports = app
