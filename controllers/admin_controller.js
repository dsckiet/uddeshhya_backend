module.exports.admin = async (req, res) => {
	let totalVolunteers = await Volunteer.countDocuments();
	let totalBloodDonors = await BloodDonor.countDocuments();
	let totalBloodRequests = await BloodRequest.countDocuments();
	res.status(200).json({
		message: 'success',
		totalBloodDonors,
		totalBloodRequests,
		totalVolunteers
	});
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

module.exports.donors = async (req, res) => {
	let { bloodGroup } = req.body;
	let donors;
	if (bloodGroup) {
		donors = await BloodDonor.find({ bloodGroup }).sort({
			createdAt: 'desc'
		});
	} else {
		donors = await BloodDonor.find().sort({ createdAt: 'desc' });
	}
	if (donors.length !== 0) {
		res.status(200).json({ message: 'success', donors });
	} else {
		res.status(404).json({ message: 'No Donors!!' });
	}
};

module.exports.bloodRequests = async (req, res) => {
	let requests = await BloodRequest.find().sort({ createdAt: 'desc' });
	if (requests.length !== 0) {
		res.status(200).json({ message: 'success', requests });
	} else {
		res.status(404).json({ message: 'No Requests!!' });
	}
};
