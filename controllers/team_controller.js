const { deleteImg, uploadImage } = require("../services/imgUpload");
const {
	sendSuccess,
	sendError,
	slugify,
	generateHash
} = require("../utility/helpers");
const { BAD_REQUEST, SERVER_ERROR } = require("../utility/statusCodes");

module.exports.team = async (req, res) => {
	let team = await Team.find().sort({ createdAt: "desc" }).lean();
	return sendSuccess(res, { team });
};

module.exports.addTeamMember = async (req, res) => {
	let { name, position, role, fb, insta, linkedin, phone, email } = req.body;

	let uploadedImage = await uploadImage(
		req.file,
		`${slugify(name)}-${generateHash(6)}`,
		"team"
	);
	if (!uploadedImage)
		return sendError(res, "Image upload failed.", SERVER_ERROR);

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
			id: uploadedImage.public_id,
			url: uploadedImage.secure_url
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
		await deleteImg(project.img.id);
		let uploadedImage = await uploadImage(
			req.file,
			`${slugify(name)}-${generateHash(6)}`,
			"team"
		);
		if (!uploadedImage)
			return sendError(res, "Image upload failed.", BAD_REQUEST);
		team.img.id = uploadedImage.public_id;
		team.img.url = uploadedImage.secure_url;
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
