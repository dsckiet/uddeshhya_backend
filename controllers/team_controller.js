const { deleteImg } = require('../config/imgUpload');

module.exports.team = async (req, res) => {
	let ngo = [], student = [];
	try {
		let team = await Team.find().sort({ createdAt: 'asc' });
		if (team.length === 0) {
			res.status(404).json({ message: 'No team members Found!!' });
		} else {
			team.map(team => {
				if(team.role === 'ngo'){
					ngo.push(team);
				} else {
					student.push(team);
				}
			})
			res.status(200).json({ message: 'success', ngo, student });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.addTeamMember = async (req, res) => {
	let { name, position, fb, insta, linkedin, phone, email, role } = req.body;
	// if (!req.file) {
	// 	res.status(400).json({ message: 'Please upload an image!!' });
	// } else {
		try {
			let team = await Team.findOne({ name, position });
			if (team) {
				res.status(400).json({
					message: 'Team Member already exists!!'
				});
			} else {
				let newTeamMember = {
					name,
					position,
					fb,
					insta,
					linkedin,
					phone,
					email,
					role,
					// img: {
					// 	id: req.file.public_id,
					// 	url: req.file.secure_url
					// }
				};
				await Team.create(newTeamMember);
				res.status(200).json({ message: 'success' });
			}
		} catch (err) {
			res.status(500).json({ message: err.message, error: true });
		}
	// }
};

module.exports.updateTeamMember = async (req, res) => {
	let {
		position,
		fb,
		insta,
		linkedin,
		phone,
		email,
		role
	} = req.body; // name field readonly in frontend
	try {
		let team = await Team.findById(req.params.id);
		if (team) {
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
			team.role = role;
			await team.save();
			res.status(200).json({ message: 'success' });
		} else {
			res.status(404).json({ message: 'Invalid Request' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.deleteTeamMember = async (req, res) => {
	try {
		let team = await Team.findById(req.params.id);
		if (team) {
			await deleteImg(team.img.id);
			await Team.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: 'success' });
		} else {
			res.status(404).json({ message: 'Invalid Team Member' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.viewTeamMember = async (req, res) => {
	try {
		let team = await Team.findById(req.params.id);
		if (team) {
			res.status(200).json({ message: 'success', team });
		} else {
			res.status(404).json({ message: 'Invalid Team Member' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};
