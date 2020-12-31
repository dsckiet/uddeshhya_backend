const { sendError, sendSuccess } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

module.exports.index = async (req, res) => {
	let totalProjects = await Project.countDocuments();
	let projects = await Project.find()
		.sort({ updatedAt: "desc" })
		.limit(3)
		.lean();
	return sendSuccess(res, { totalProjects, projects });
};

module.exports.volunteer = async (req, res) => {
	let volunteer = await Volunteer.findOne({ email: req.body.email }).lean();
	if (volunteer)
		return sendError(res, "You have already filled the form.", BAD_REQUEST);
	volunteer = await Volunteer.create(req.body);
	return sendSuccess(res, { volunteer });
};

module.exports.contact = async (req, res) => {
	let { name, email, phone, message } = req.body;
	let contactMessage = new Message({
		name,
		email,
		phone,
		message
	});

	contactMessage = await contactMessage.save();
	return sendSuccess(res, { contactMessage });
};
