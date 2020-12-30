module.exports.admin = async (req, res) => {
	let totalDonations = 0,
		totalAmount = 0;
	let totalVolunteers = await Volunteer.countDocuments();
	let totalBloodDonors = await BloodDonor.countDocuments();
	let totalBloodRequests = await BloodRequest.countDocuments();
	let donations = await Donation.find({ status: "success" }).sort({
		updatedAt: "desc"
	});
	donations.map(donation => {
		totalDonations++;
		totalAmount += donation.finalAmount;
	});
	res.status(200).json({
		message: "success",
		totalBloodDonors,
		totalBloodRequests,
		totalVolunteers,
		totalAmount,
		totalDonations
	});
};

module.exports.volunteers = async (req, res) => {
	let volunteers = await Volunteer.find().sort({ createdAt: "desc" });
	res.status(200).json({ message: "success", volunteers });
};

module.exports.donors = async (req, res) => {
	let { bloodGroup } = req.body;
	let donors;
	if (bloodGroup) {
		donors = await BloodDonor.find({ bloodGroup }).sort({
			createdAt: "desc"
		});
	} else {
		donors = await BloodDonor.find().sort({ createdAt: "desc" });
	}

	res.status(200).json({ message: "success", donors });
};

module.exports.bloodRequests = async (req, res) => {
	let requests = await BloodRequest.find().sort({ createdAt: "desc" });
	res.status(200).json({ message: "success", requests });
};

module.exports.messages = async (req, res) => {
	let messages = await Message.find().sort({ createdAt: "desc" });
	res.status(200).json({ messgae: "success", messages });
};

module.exports.donations = async (req, res) => {
	let totalDonations = 0,
		totalAmount = 0,
		totalCharges = 0,
		totalDonationAmount = 0;
	let donations = await Donation.find({ status: "success" }).sort({
		updatedAt: "desc"
	});
	donations.map(donation => {
		totalDonations++;
		totalAmount += donation.finalAmount;
		totalCharges += donation.charges;
		totalDonationAmount += donation.amount;
	});
	res.status(200).json({
		message: "success",
		donations,
		totalDonations,
		totalCharges,
		totalDonationAmount,
		totalAmount
	});
};
