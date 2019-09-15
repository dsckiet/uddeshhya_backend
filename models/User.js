const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: 'admin' }
}, { timestamps: true }
);

UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({
		id: this._id,
		name: this.name,
		role: this.role,
		email: this.email
	},
	process.env.JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = User = mongoose.model('User', UserSchema);
