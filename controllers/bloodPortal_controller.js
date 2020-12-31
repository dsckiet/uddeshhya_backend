const { sendError, sendSuccess } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

module.exports.registerDonor = async (req, res) => {
	let { name, bloodGroup, phone, email, dob, address, hasDonated } = req.body;
	let donor = await BloodDonor.findOne({
		$or: [{ email }, { phone }]
	}).lean();
	if (donor)
		return sendError(res, "phone or email already in use.", BAD_REQUEST);
	let newBloodDonor = new BloodDonor({
		name,
		bloodGroup,
		phone,
		email,
		dob,
		address,
		hasDonated
	});
	newBloodDonor = await newBloodDonor.save();
	return sendSuccess(res, { newBloodDonor });
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
	let newBloodRequest = new BloodRequest({
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
	});
	newBloodRequest = await newBloodRequest.save();
	return sendSuccess(res, { newBloodRequest });
};
