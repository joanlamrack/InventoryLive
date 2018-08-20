const Item = require("../models/items");
const AuthHelper = require("../helpers/authhelper");
const ObjectId = require("mongoose").Types.ObjectId;

class ItemController {
	constructor() {}

	static create(req, res) {
		Item.create({
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			tags: req.body.tags
		})
			.then(result => {
				result.user = req.header.userId;
				res.status(201).json(result);
			})
			.catch(err => {
				res.status(400).json({
					success: false,
					message: err
				});
			});
	}

	static getAll(req, res) {
		let name = req.query.name;
		let price_start = req.query.price_start || 0;
		let tags = req.query.tag;

		let obj = {};
		if (name && name.length) {
			obj.name = new RegExp(`${name}`, "i");
		}
		if ( price_start &&price_start !== 0) {
			obj.price = { $gte: price_start };
		}
		if (tags && tags.length) {
			obj.tags = new RegExp(`${tags}`, "i");
		}

		Item.find(obj)
			.then(allItems => {
				res.status(200).json(allItems);
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}

	static getOneById(req, res) {
		Item.findById(req.headers.userId)
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
		Item.deleteOne({ _id: ObjectId(req.headers.userId) })
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
		Item.findOneAndUpdate({ _id: ObjectId(req.headers.userId) }, { password })
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

module.exports = ItemController;
