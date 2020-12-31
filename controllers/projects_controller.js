const { deleteImg } = require("../config/imgUpload");
const { sendSuccess, sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

module.exports.projects = async (req, res) => {
	let projects = await Project.find().sort({ updatedAt: "desc" }).lean();
	return sendSuccess(res, { projects });
};

module.exports.addProject = async (req, res) => {
	let { title, description } = req.body;
	if (!req.file)
		return sendError(res, "Please upload an image.", BAD_REQUEST);
	let project = await Project.findOne({ title }).lean();
	if (project) return sendError(res, "Project already exists.", BAD_REQUEST);
	project = new Project({
		title,
		description,
		img: {
			id: req.file.public_id,
			url: req.file.secure_url
		}
	});
	project = await project.save();
	return sendSuccess(res, project);
};

module.exports.updateProject = async (req, res) => {
	let { title, description } = req.body;
	let project = await Project.findById(req.params.id).lean();
	if (!project) return sendError(res, "Project not found.", BAD_REQUEST);
	if (req.file) {
		await deleteImg(project.img.id);
		project.img.id = req.file.public_id;
		project.img.url = req.file.secure_url;
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
