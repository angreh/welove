'use strict'

var express = 	require ( 'express' ),
	ctl =		require ( '../controllers' )


var router = express.Router ()

router.get ( '/', ctl.pages.index )

module.exports = router
