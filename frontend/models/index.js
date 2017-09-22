'use strict'

var fs	 = require ( "fs" )


var model = {}

fs
	.readdirSync ( __dirname )
	.filter ( ( file ) => {
		return ( file.indexOf ( "." ) !== 0 ) && ( file !== "index.js" )
	})
	.forEach ( ( file ) => {
		var name = file.slice ( 0,-3 )
		model[name] = require ( './' + file.slice ( 0,-3 ) )
	})

module.exports = model
