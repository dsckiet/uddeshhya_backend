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
			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(password, salt);
			await User.create(req.body);
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
			password = await bcrypt.hash(password, salt);
			user.name = name;
			user.email = email;
			user.password = password;
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
	// image upload processing pending
	try {
		let project = await Project.findOne({ title });
		if (project) {
			res.status(400).json({ message: 'Project title already exists!!' });
		} else {
			let newProject = {
				title,
				description,
				img
			};
			await Project.create(newProject);
			res.status(200).json({ message: 'success' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.updateProject = async (req, res) => {
	let { title, description } = req.body;
	// image upload processing pending
	let newProject = {
		title,
		description,
		img
	};
	try {
		let project = await Project.findByIdAndUpdate(
			req.params.id,
			newProject
		);
		if (project) {
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
		let project = await Project.findByIdAndDelete(req.params.id);
		if (project) {
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
