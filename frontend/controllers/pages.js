'use strict'

var models = require ( '../models' )

exports.index = ( req, res ) => {
	console.log ( models.users.index () )
	res.render ( 'pages/index', { teste: models.users.index } )
}