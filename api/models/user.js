"use strict";

var bcrypt = require ( 'bcrypt' )

module.exports = function ( sequelize, DataTypes )
{
	var user = sequelize.define(
		"user",
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING
		}
	)

	user.getUserByUsername = function ( username, callback )
	{
		user
			.findOne ( { where: { username: username } } )
			.then ( callback )
	}

	user.comparePassword = function ( password, hash, callback )
	{
		bcrypt.compare (
			password,
			hash,
			function ( err, isMatch )
			{
				if ( err ) return callback ( err )
				callback ( null, isMatch )
			}
		)
	}

	return user
}