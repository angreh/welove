'use strict'

var express = require ( 'express' )


var router = express.Router (),
	ctl = require ( '../controllers/loginController' )

router.get( '/', ctl.index )

module.exports = router
