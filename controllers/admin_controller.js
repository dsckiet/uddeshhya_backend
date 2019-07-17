const bcrypt = require('bcryptjs');

const { deleteImg } = require('../config/imgUpload');

module.exports.login = async (req, res) => {
	let { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			let isValidPwd = await bcrypt.compare(password, user.password);
			if (isValidPwd) {
				const token = user.generateAuthToken();
				res.header('x-auth-token', token).json({
					message: 'success',
					user
				});
			} else {
				res.status(400).json({ message: 'Invalid credentials!!' });
			}
		} else {
			res.status(400).json({ message: 'Invalid user' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.users = async (req, res) => {
	try {
		let users = await User.find().sort({
			updatedAt: 'desc',
			role: 'asc'
		});
		if (users.length === 0) {
			res.status(404).json({ message: 'No users Found!!' });
		} else {
			res.status(200).json({ message: 'success', users });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.addUser = async (req, res) => {
	let { name, email, password, role } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			res.status(400).json({ message: 'EmailID already exists!!' });
		} else {
			let newUser = {
				name,
				email,
				password,
				role
			};
			const salt = await bcrypt.genSalt(10);
			newUser.password = await bcrypt.hash(newUser.password, salt);
			await User.create(newUser);
			res.status(200).json({ message: 'success' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.updateUser = async (req, res) => {
	let { name, email, password, role } = req.body;
	try {
		let user = await User.findById(req.params.id);
		if (user) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
			user.name = name;
			user.email = email;
			user.role = role;
			await user.save();
			res.status(200).json({ message: 'success' });
		} else {
			res.status(404).json({ message: 'Invalid user' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.deleteUser = async (req, res) => {
	try {
		let user = await User.findByIdAndDelete(req.params.id);
		if (user) {
			res.status(200).json({ message: 'success' });
		} else {
			res.status(404).json({ message: 'Invalid user' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.viewUser = async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		if (user) {
			res.status(200).json({ message: 'success', user });
		} else {
			res.status(404).json({ message: 'Invalid user' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.volunteers = async (req, res) => {
	try {
		let volunteers = await Volunteer.find().sort({ createdAt: 'desc' });
		if (volunteers.length !== 0) {
			res.status(200).json({ message: 'success', volunteers });
		} else {
			res.status(404).json({ message: 'No volunteers yet!!' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true, data: null });
	}
};

module.exports.projects = async (req, res) => {
	try {
		let projects = await Project.find().sort({ updatedAt: 'desc' });
		if (projects.length === 0) {
			res.status(404).json({ message: 'No Projects Found!!' });
		} else {
			res.status(200).json({ message: 'success', projects });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.addProject = async (req, res) => {
	let { title, description } = req.body;
	if (!req.file) {
		res.status(400).json({ message: 'Please upload an image!!' });
	} else {
		try {
			let project = await Project.findOne({ title });
			if (project) {
				res.status(400).json({
					message: 'Project title already exists!!'
				});
			} else {
				let newProject = {
					title,
					description,
					img: {
						id: req.file.public_id,
						url: req.file.url
					}
				};
				await Project.create(newProject);
				res.status(200).json({ message: 'success' });
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
				project.img.url = req.file.url;
			}
			project.title = title;
			project.description = description;
			await project.save();
			res.status(200).json({ message: 'success' });
		} else {
			res.status(404).json({ message: 'Invalid Project' });
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
			res.status(200).json({ message: 'success' });
		} else {
			res.status(404).json({ message: 'Invalid Project' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.viewProject = async (req, res) => {
	try {
		let project = await Project.findById(req.params.id);
		if (project) {
			res.status(200).json({ message: 'success', project });
		} else {
			res.status(404).json({ message: 'Invalid Project' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};
