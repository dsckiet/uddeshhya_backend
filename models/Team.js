const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
	name: { type: String, required: true },
	position: { type: String, required: true },
	img: {
		id: { type: String },
		url: { type: String }
    },
    fb: { type: String },
    insta: { type: String },
    linkedin: { type: String },
    phone: { type: String },
    email: { type: String }
}, { timestamps: true }
);

module.exports = Team = mongoose.model('Team', TeamSchema);
