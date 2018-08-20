const User = require("../models/users");
const AuthHelper = require("../helpers/authhelper");
const ObjectId = require("mongoose").Types.ObjectId;
const Todo = require("../models/users");

class UserController {
	constructor() {}

	static create(req, res) {
		let password = AuthHelper.createHashPass(
			req.body.username + req.body.password
		);
		User.create({
			username: req.body.username,
			password: password
		})
			.then(result =>
				res.status(201).json({
					success: true,
					message: `Account ${result.username} registered`
				})
			)
			.catch(err =>
				res.status(400).json({
					success: false,
					message: err
				})
			);
	}

	static verifyToken(req, res) {
		let id = AuthHelper.decodeToken(req.body.token).id;
		User.findById(ObjectId(id))
			.then(userFound => {
				if (userFound) {
					res.status(200).json({
						message: "OK",
						data: {
							name: userFound.name
						}
					});
				} else {
					res.status(204).json({
						message: "NK"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}

	static login(req, res) {
		console.log(req.body);
		User.findOne({ username: req.body.username })
			.exec()
			.then(user => {
				if (
					user &&
					AuthHelper.compareSync(
						req.body.username + req.body.password,
						user.password
					)
				) {
					let token = AuthHelper.createToken({
						id: user._id.toString()
					});
					res.status(200).json({
						token: token
					});
				} else {
					res.status(404).json({
						message: "Wrong Email or Password"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static getOneById(req, res) {
		User.findById(req.headers.userId)
			.populate("userTodos")
			.then(result => {
				res.status(200).json({
					message: "success",
					data: result
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static deleteById(req, res) {
		User.deleteOne({ _id: ObjectId(req.headers.userId) })
			.then(result => {
				res.status(200).json({
					message: "success",
					data: result
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}

	static updatebyId(req, res) {
		let password = AuthHelper.createHashPass(
			req.headers.email + req.body.password
		);
		User.findOneAndUpdate({ _id: ObjectId(req.headers.userId) }, { password })
			.exec()
			.then(result => {
				res.status(200).json({
					message: "update success",
					data: result
				});
			})
			.catch(err => {
				res.status(400).json({
					message: err.message,
					data: err
				});
			});
	}
}

module.exports = UserController;
