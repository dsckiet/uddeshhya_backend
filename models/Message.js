const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: Number, required: true },
		message: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = Message = mongoose.model("Message", MessageSchema);
