const bcrypt = require('bcryptjs');

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
