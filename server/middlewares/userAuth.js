const User = require("../models/users");
const AuthHelper = require("../helpers/authhelper");
const ObjectId = require("mongoose").Types.ObjectId;

class userAuthMiddleware {
	constructor() {}

	static checkToken(req, res, next) {
		console.log(req.headers)
		if (!req.headers.authorization) {
			res.status(401).json({
				message: "Unauthorized Access, please signin1"
			});
		} else {
			next();
		}
	}

	static checkifTokenValid(req, res, next) {
		let token = req.headers.authorization;
		token = token.replace(/Basic /gi,"");
		let id;
		try {
			id = AuthHelper.decodeToken(token).id;
			console.log("this",id);
			User.findById(ObjectId(id))
				.then(userFound => {
					if (userFound) {
						req.headers.userId = userFound._id;
						next();
					} else {
						res.status(400).json({
							error: "You are not authorized to access this API"
						});
					}
				})
				.catch(err => {
					res.status(400).json({
						error: "You are not authorized to access this API"
					});
				});
		} catch (err) {
			res.status(400).json({
				error: "You are not authorized to access this API"
			});
		}
	}
}

module.exports = userAuthMiddleware;
