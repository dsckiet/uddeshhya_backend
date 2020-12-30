module.exports.registerDonor = async (req, res) => {
	let { name, bloodGroup, phone, email, dob, address, hasDonated } = req.body;
	let donor = await BloodDonor.findOne({ $and: [{ email }, { phone }] });
	if (donor) {
		res.status(400).json({
			message: "phone or email already in use."
		});
	} else {
		await BloodDonor.create(req.body);
		res.status(200).json({ message: "success" });
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
	await BloodRequest.create(req.body);
	res.status(200).json({ message: "success" });
};
