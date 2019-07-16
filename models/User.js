const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true, enum: ['admin', 'member'] }
});

UserSchema.methods.generateAuthToken = () => {
	const token = jwt.sign(
		{
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