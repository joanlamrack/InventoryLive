const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ItemSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true},
		stock: { type: Number, required:true},
		tags: { type: [String], required: true }
	}
);

module.exports = mongoose.model("Item", ItemSchema);