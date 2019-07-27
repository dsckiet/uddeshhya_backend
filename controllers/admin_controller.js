module.exports.admin = async (req, res) => {
	res.status(200).json({ message: 'Under Development!!' });
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
