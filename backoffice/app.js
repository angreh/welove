'use strict'

var express = 		require ( 'express' ),
	path = 			require ( 'path' ),
	favicon = 		require ( 'serve-favicon' ),
	logger = 		require ( 'morgan' ),
	cookieParser = 	require ( 'cookie-parser' ),
	bodyParser = 	require ( 'body-parser' ),
	methodOver = 	require ( 'method-override' ),
	adaro = 		require ( 'adaro' ),
	fs = 			require ( 'fs' ),
	flash = 		require ( 'connect-flash' ),
	passport = 		require ( 'passport' ),
	session = 		require ( 'cookie-session' ),
	expressVal = 	require ( 'express-validator' )


var app = express()

// Adaro/DustJS: start
app.engine ( 'dust', adaro.dust () )
app.set ( 'view engine', 'dust' )
app.set ( 'views', 'src/templates' )
// Adaro/DustJS: end

// ExpressJS defaults: start
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ExpressJS defaults: end

// Session: start
app.use ( session ({
	name: 'session',
	keys: [ 'hmmm', 'kkkk' ]
}))
// Session: end

// Passport: start
app.use ( passport.initialize () )
app.use ( passport.session () )
// Passport: end

// Express-validator: start
app.use ( expressVal ({
	errorFormatter: ( param, msg, value ) => {
		var namespace = param.split ( '.' ),
			root = namespace.shift(),
			formParam = root

		while ( namespace.length )
		{
			formParam += '[' + namespace.shift() + ']'
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		}
	}
}))
// Express-validator: end

// ExpressJS defaults: start
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ExpressJS defaults: end

// Connect-flash/Espress-messages: start
app.use ( flash () )
app.use ( ( req, res, next ) => {
	res.locals.messages = require ( 'express-messages' )( req, res )
	next ()
})
// Connect-flash/Espress-messages: end

// Method-override: start
app.use( methodOver ( function ( req, res )
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

// routers includer: start
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
			var rota = ( filePath == 'routes/index.js' ) ? '/' : filePath.slice ( 6, -3 )
			app.use(
				rota,
				require( './' + filePath.slice( 0, -3 ) )
			)
		}
	})
}
routerRegister ( 'routes' )
// routers includer: end

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
