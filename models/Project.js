const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		img: {
			id: { type: String },
			url: { type: String }
		}
	},
	{ timestamps: true }
);

module.exports = Project = mongoose.model("Project", ProjectSchema);
