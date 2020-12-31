const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendError, sendSuccess } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

module.exports.login = async (req, res) => {
	let { email, password } = req.body;
	let user = await User.findOne({ email });
	if (!user) return sendError(res, "Invalid user.", BAD_REQUEST);
	let isValidPwd = await bcrypt.compare(password, user.password);
	if (!isValidPwd) return sendError(res, "Invalid credentials.", BAD_REQUEST);
	const token = user.generateAuthToken();
	return sendSuccess(res, { user }, token);
};

module.exports.users = async (req, res) => {
	let users = await User.find()
		.sort({
			updatedAt: "desc",
			role: "asc"
		})
		.lean();
	return sendSuccess(res, { users });
};

module.exports.addUser = async (req, res) => {
	let { name, email, password } = req.body;
	let user = await User.findOne({ email }).lean();
	if (user) return sendError(res, "User already registered.", BAD_REQUEST);
	user = new User({
		name,
		email,
		password
	});
	user = await user.save();
	return sendSuccess(res, { user });
};

module.exports.updateUser = async (req, res) => {
	let { name, email, password } = req.body;
	let user = await User.findById(req.params.id);
	if (!user) return sendError(res, "User not found.", BAD_REQUEST);
	user.name = name;
	user.email = email;
	user.password = password;
	user = await user.save();
	return sendSuccess(res, { user });
};

module.exports.deleteUser = async (req, res) => {
	let user = await User.findByIdAndRemove(req.params.id);
	if (!user) return sendError(res, "User not found.", BAD_REQUEST);
	return sendSuccess(res, {});
};

module.exports.viewUser = async (req, res) => {
	let user = await User.findById(req.params.id).lean();
	if (!user) return sendError(res, "User not found.", BAD_REQUEST);
	return sendSuccess(res, { user });
};

// module.exports.init = async (req, res) => {
// 	await User.deleteMany({});
// 	let rootUser = new User({
// 		name: process.env.ROOT_USER_NAME,
// 		email: process.env.ROOT_USER_EMAIL,
// 		password: process.env.ROOT_USER_PWD
// 	});
// 	let adminUser = new User({
// 		name: process.env.ADMIN_USER_NAME,
// 		email: process.env.ADMIN_USER_EMAIL,
// 		password: process.env.ADMIN_USER_PWD
// 	});
// 	await rootUser.save();
// 	await adminUser.save();
// 	return sendSuccess(res, {});
// };
