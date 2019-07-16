module.exports.volunteerForm = async (req, res) => {
	let {
		email,
		name,
		phone,
		alternatePhone,
		currentAddress,
		permanentAddress,
		branch,
		year,
		bloodgroup,
		college,
		aboutUddeshhya,
		heardFrom,
		workSpan,
		skills,
		suggestion
	} = req.body;

	try {
		let volunteer = await Volunteer.findOne({ email: req.body.email });
		if (volunteer) {
			res.status(400).json({
				message: 'You have already filled the form'
			});
		} else {
			await Volunteer.create(req.body);
			res.status(200).json({ message: 'success' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.volunteerList = async (req, res) => {
	try {
		let data = await Volunteer.find();
		if (data.length !== 0) {
			res.status(200).json({
				message: 'success',
				error: false,
				data
			});
		} else {
			res.status(404).json({
				message: 'No volunteers yet.',
				error: false,
				data: null
			});
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true, data: null });
	}
};
