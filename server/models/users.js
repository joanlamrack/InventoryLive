const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		google_id: String
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

module.exports = mongoose.model("User", userSchema);
