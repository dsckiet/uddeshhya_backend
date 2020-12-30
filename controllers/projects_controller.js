const { deleteImg } = require("../config/imgUpload");

module.exports.projects = async (req, res) => {
	try {
		let projects = await Project.find().sort({ updatedAt: "desc" });

		res.status(200).json({ message: "success", projects });
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.addProject = async (req, res) => {
	let { title, description } = req.body;
	if (!req.file) {
		res.status(400).json({ message: "Please upload an image!!" });
	} else {
		try {
			let project = await Project.findOne({ title });
			if (project) {
				res.status(400).json({
					message: "Project title already exists!!"
				});
			} else {
				let newProject = {
					title,
					description,
					img: {
						id: req.file.public_id,
						url: req.file.secure_url
					}
				};
				await Project.create(newProject);
				res.status(200).json({ message: "success" });
			}
		} catch (err) {
			res.status(500).json({ message: err.message, error: true });
		}
	}
};

module.exports.updateProject = async (req, res) => {
	let { title, description } = req.body;
	let img = {};
	try {
		let project = await Project.findById(req.params.id);
		if (project) {
			if (req.file) {
				await deleteImg(project.img.id);
				project.img.id = req.file.public_id;
				project.img.url = req.file.secure_url;
			}
			project.title = title;
			project.description = description;
			await project.save();
			res.status(200).json({ message: "success" });
		} else {
			res.status(404).json({ message: "Invalid Project" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.deleteProject = async (req, res) => {
	try {
		let project = await Project.findById(req.params.id);
		if (project) {
			await deleteImg(project.img.id);
			await Project.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: "success" });
		} else {
			res.status(404).json({ message: "Invalid Project" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.viewProject = async (req, res) => {
	try {
		let project = await Project.findById(req.params.id);
		if (project) {
			res.status(200).json({ message: "success", project });
		} else {
			res.status(404).json({ message: "Invalid Project" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};
