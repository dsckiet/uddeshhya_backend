const { deleteImg, uploadImage } = require("../services/imgUpload");
const {
	sendSuccess,
	sendError,
	slugify,
	generateHash
} = require("../utility/helpers");
const { BAD_REQUEST, SERVER_ERROR } = require("../utility/statusCodes");

module.exports.projects = async (req, res) => {
	let projects = await Project.find().sort({ updatedAt: "desc" }).lean();
	return sendSuccess(res, { projects });
};

module.exports.addProject = async (req, res) => {
	let { title, description } = req.body;
	let uploadedImage = await uploadImage(
		req.file,
		`${slugify(title)}-${generateHash(6)}`,
		"projects"
	);
	if (!uploadedImage)
		return sendError(res, "Image upload failed.", SERVER_ERROR);

	let project = await Project.findOne({ title });
	if (project) return sendError(res, "Project already exists.", BAD_REQUEST);
	project = new Project({
		title,
		description,
		img: {
			id: uploadedImage.public_id,
			url: uploadedImage.secure_url
		}
	});
	project = await project.save();
	return sendSuccess(res, project);
};

module.exports.updateProject = async (req, res) => {
	let { title, description } = req.body;
	let project = await Project.findById(req.params.id);
	if (!project) return sendError(res, "Project not found.", BAD_REQUEST);
	if (req.file) {
		await deleteImg(project.img.id);
		let uploadedImage = await uploadImage(
			req.file,
			`${slugify(title)}-${generateHash(6)}`,
			"projects"
		);
		if (!uploadedImage)
			return sendError(res, "Image upload failed.", BAD_REQUEST);
		project.img.id = uploadedImage.public_id;
		project.img.url = uploadedImage.secure_url;
	}
	project.title = title;
	project.description = description;
	await project.save();
	return sendSuccess(res, {});
};

module.exports.deleteProject = async (req, res) => {
	let project = await Project.findByIdAndRemove(req.params.id).lean();
	if (!project) return sendError(res, "Project not found.", BAD_REQUEST);
	await deleteImg(project.img.id);
	return sendSuccess(res, {});
};

module.exports.viewProject = async (req, res) => {
	let project = await Project.findById(req.params.id).lean();
	if (!project) return sendError(res, "Project not found.", BAD_REQUEST);
	return sendSuccess(res, { project });
};
