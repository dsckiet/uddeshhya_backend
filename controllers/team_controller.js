const { deleteImg } = require("../services/imgUpload");
const { sendSuccess, sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

module.exports.team = async (req, res) => {
	let team = await Team.find().sort({ createdAt: "desc" }).lean();
	return sendSuccess(res, { team });
};

module.exports.addTeamMember = async (req, res) => {
	let { name, position, role, fb, insta, linkedin, phone, email } = req.body;

	if (!req.file)
		return sendError(res, "Please upload an image.", BAD_REQUEST);

	let team = await Team.findOne({ name, position });
	if (team) return sendError(res, "Team Member already exists.", BAD_REQUEST);

	team = new Team({
		name,
		position,
		role,
		fb,
		insta,
		linkedin,
		phone,
		email,
		img: {
			id: req.file.public_id,
			url: req.file.secure_url
		}
	});
	team = await team.save();
	return sendSuccess(res, { team });
};

module.exports.updateTeamMember = async (req, res) => {
	let { position, fb, insta, linkedin, phone, email } = req.body; // name field readonly in frontend
	let team = await Team.findById(req.params.id);
	if (!team) return sendError(res, "Team member not found", BAD_REQUEST);
	if (req.file) {
		await deleteImg(team.img.id);
		team.img.id = req.file.public_id;
		team.img.url = req.file.secure_url;
	}
	team.position = position;
	team.fb = fb;
	team.insta = insta;
	team.linkedin = linkedin;
	team.phone = phone;
	team.email = email;
	await team.save();
	return sendSuccess(res, {});
};

module.exports.deleteTeamMember = async (req, res) => {
	let team = await Team.findByIdAndRemove(req.params.id).lean();
	if (!team) return sendError(res, "Team member not found", BAD_REQUEST);
	await deleteImg(team.img.id);
	return sendSuccess(res, {});
};

module.exports.viewTeamMember = async (req, res) => {
	let team = await Team.findById(req.params.id).lean();
	if (!team) return sendError(res, "Team member not found", BAD_REQUEST);
	return sendSuccess(res, { team });
};
