const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		img: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = Project = mongoose.model('Project', ProjectSchema);
