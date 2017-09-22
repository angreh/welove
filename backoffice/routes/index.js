'use strict'

var express = require ( 'express' )


var router = express.Router (),
	ctl = require ( '../controllers/indexController' )

router.get( '/', ctl.index )

module.exports = router
