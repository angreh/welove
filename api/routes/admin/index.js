'use strict'

var express = require ( 'express' )


var router = express.Router (),
	ctl = require ( '../../controllers/indexController' )

router.get( '/', ( req, res ) => { res.send ( 'admin' ) } )

module.exports = router
