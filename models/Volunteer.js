const mongoose = require('mongoose');
const Volunteerschema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		maxlength: 50,
		minlength: 5,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	alternatePhone: {
		type: Number
	},
	currentAddress: {
		type: String,
		required: true
	},
	permanentAddress: {
		type: String,
		required: true
	},
	branch: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	bloodgroup: {
		type: String,
		required: true
	},
	college: {
		type: String
	},
	// aboutUddeshhya: {
	// 	type: String,
	// 	minlength: 10,
	// 	maxlength: 500,
	// 	required: true
	// },
	heardFrom: {
		type: String,
		required: true,
		enum: ['Faculity', 'Friends', 'Social media', 'Others']
	},
	workSpan: {
		type: String,
		required: true,
		enum: ['6 Months', '1 Year', 'Other']
	},
	skills: {
		type: Array,
	},
	suggestion: {
		type: String
	}
}, { timestamps: true }
);

module.exports = Volunteer = mongoose.model('Volunteer', Volunteerschema);
