module.exports.registerDonor = async (req, res) => {
	let { name, bloodGroup, phone, email, dob, address, hasDonated } = req.body;
	try {
		let donor = await BloodDonor.findOne({ $and: [{ email }, { phone }] });
		if (donor) {
			res.status(400).json({
				message: 'phone or email already in use.'
			});
		} else {
			await BloodDonor.create(req.body);
			res.status(200).json({ message: 'success' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.requestBlood = async (req, res) => {
	let {
		name,
		bloodGroup,
		phone,
		dob,
		address,
		pincode,
		requestFor,
		require,
		units,
		reason,
		neededBy,
		timings
	} = req.body;
	try {
		await BloodRequest.create(req.body);
		res.status(200).json({ message: 'success' });
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};
