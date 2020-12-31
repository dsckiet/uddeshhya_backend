const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_PRIVATE_KEY } = require("../config/index");

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, default: "admin" }
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	this.email = String(this.email).trim().toLowerCase();
	if (!this.isModified("password")) return next();
	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	next();
});

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			id: this._id,
			name: this.name,
			role: this.role,
			email: this.email
		},
		JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = User = mongoose.model("User", UserSchema);
