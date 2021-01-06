const { sendSuccess } = require("../utility/helpers");

module.exports.admin = async (req, res) => {
	let totalDonations = 0,
		totalAmount = 0;
	let totalVolunteers = await Volunteer.countDocuments();
	let totalBloodDonors = await BloodDonor.countDocuments();
	let totalBloodRequests = await BloodRequest.countDocuments();
	let donations = await Donation.find({ status: "success" })
		.sort({
			updatedAt: "desc"
		})
		.lean();
	donations.map(donation => {
		totalDonations++;
		totalAmount += donation.finalAmount;
	});

	let data = {
		totalBloodDonors,
		totalBloodRequests,
		totalVolunteers,
		totalAmount,
		totalDonations
	};
	return sendSuccess(res, data);
};

module.exports.volunteers = async (req, res) => {
	let volunteers = await Volunteer.find().sort({ createdAt: "desc" }).lean();
	return sendSuccess(res, { volunteers });
};

module.exports.donors = async (req, res) => {
	let { bloodGroup } = req.body;
	let donors;
	if (bloodGroup) {
		donors = await BloodDonor.find({ bloodGroup })
			.sort({
				createdAt: "desc"
			})
			.lean();
	} else {
		donors = await BloodDonor.find().sort({ createdAt: "desc" }).lean();
	}

	return sendSuccess(res, { donors });
};

module.exports.bloodRequests = async (req, res) => {
	let requests = await BloodRequest.find().sort({ createdAt: "desc" }).lean();
	return sendSuccess(res, { requests });
};

module.exports.messages = async (req, res) => {
	let messages = await Message.find().sort({ createdAt: "desc" }).lean();
	return sendSuccess(res, { messages });
};

module.exports.donations = async (req, res) => {
	let totalDonations = 0,
		totalAmount = 0,
		totalCharges = 0,
		totalDonationAmount = 0;
	let donations = await Donation.find({ status: "success" })
		.sort({
			updatedAt: "desc"
		})
		.lean();
	donations.map(donation => {
		totalDonations++;
		totalAmount += donation.finalAmount;
		totalCharges += donation.charges;
		totalDonationAmount += donation.amount;
	});
	let data = {
		donations,
		totalDonations,
		totalCharges,
		totalDonationAmount,
		totalAmount
	};
	return sendSuccess(res, data);
};
