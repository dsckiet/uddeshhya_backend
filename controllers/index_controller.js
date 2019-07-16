module.exports.index = async (req, res) => {
	try {
		let projects = await Project.find().sort({ createdAt: 'desc' });
		let totalProjects = 0;
		if (projects.length !== 0) {
			totalProjects = projects.length();
			res.status(200).json({
				message: 'success',
				projects,
				totalProjects
			});
		} else {
			res.status(400).json({
				message: 'No projects yet!!',
				totalProjects
			});
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

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
	// validations for fields pending
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
