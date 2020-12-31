const { sendError, toTitleCase } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

// regex definitions
let emailRegex = /\S+@\S+\.\S+/,
	phoneRegex = /(^[6-9]{1}[0-9]{9}$)/,
	passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})"),
	pincodeRegex = /(^[0-9]{6}$)/gm,
	unitsRegex = /(^[1-4]{1}$)/gm;

module.exports.userValidation = (req, res, next) => {
	let { name, email, password } = req.body;
	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!password || !passwordRegex.test(String(password).trim()))
		return sendError(
			res,
			"Password must be atleast 6 characters long and contain atleast one alphabet and number.",
			BAD_REQUEST
		);
	return next();
};

module.exports.volunteerValidation = (req, res, next) => {
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
		// aboutUddeshhya,
		heardFrom,
		workSpan,
		skills,
		suggestion,
		project
	} = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!phone || !phoneRegex.test(Number(phone)))
		return sendError(res, "Phone is not valid.", BAD_REQUEST);
	if (alternatePhone && !phoneRegex.test(Number(alternatePhone)))
		return sendError(res, "Alternate Phone is not valid.", BAD_REQUEST);
	if (!currentAddress)
		return sendError(res, "Current Address is not provided.", BAD_REQUEST);
	if (!permanentAddress)
		return sendError(res, "Permanent Address not provided.", BAD_REQUEST);
	if (!branch) return sendError(res, "Branch is not provided.", BAD_REQUEST);
	if (!year) return sendError(res, "Year is not provided.", BAD_REQUEST);
	if (!bloodgroup)
		return sendError(res, "Blood Group is not provided.", BAD_REQUEST);
	if (!college)
		return sendError(res, "College is not provided.", BAD_REQUEST);
	if (!heardFrom)
		return sendError(res, "Heard from is not provided.", BAD_REQUEST);
	if (!workSpan)
		return sendError(res, "Work Span is not provided.", BAD_REQUEST);
	if (!project)
		return sendError(res, "Project Details are not provided.", BAD_REQUEST);
	return next();
};

module.exports.projectValidation = (req, res, next) => {
	let { title, description } = req.body;
	if (!title) return sendError(res, "Title is not provided.", BAD_REQUEST);
	if (!description)
		return sendError(res, "Description is not provided.", BAD_REQUEST);
	req.file = req.files[0];
	return next();
};

module.exports.teamValidation = (req, res, next) => {
	let { name, position, fb, insta, linkedin, phone, email } = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!position)
		return sendError(res, "Position is not provided.", BAD_REQUEST);
	if (!phone || !phoneRegex.test(phone))
		return sendError(res, "Phone is not valid.", BAD_REQUEST);
	req.file = req.files[0];
	return next();
};

module.exports.bloodDonorValidation = (req, res, next) => {
	let {
		name,
		bloodGroup,
		phone,
		email,
		dob, // format: YYYY/MM/DD
		address,
		hasDonated
	} = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!bloodGroup)
		return sendError(res, "Blood Group is not provided.", BAD_REQUEST);
	if (!phone || !phoneRegex.test(Number(phone)))
		return sendError(res, "Phone is not valid.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!address)
		return sendError(res, "Address is not provided.", BAD_REQUEST);

	// 18 yrs from dob
	let newDate = new Date(
		new Date(dob).setFullYear(new Date(dob).getFullYear() + 18)
	);
	if (newDate > new Date(Date.now()))
		return sendError(
			res,
			"Donor must be atleast 18 years old.",
			BAD_REQUEST
		);
	return next();
};

module.exports.requestBloodValidation = (req, res, next) => {
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

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!bloodGroup)
		return sendError(res, "Blood Group is not provided.", BAD_REQUEST);
	if (!phone || !phoneRegex.test(Number(phone)))
		return sendError(res, "Phone is not valid.", BAD_REQUEST);
	if (!dob) return sendError(res, "DOB is not provided.", BAD_REQUEST);
	if (!address)
		return sendError(res, "Address is not provided.", BAD_REQUEST);
	if (!pincode || !pincodeRegex.test(Number(pincode)))
		return sendError(res, "Pincode is not valid.", BAD_REQUEST);
	if (!require) return sendError(res, "DOB is not provided.", BAD_REQUEST);
	if (!units || !unitsRegex.test(Number(units)))
		return sendError(res, "Maximum 4 units are allowed.", BAD_REQUEST);
	if (!neededBy)
		return sendError(res, "Needed by is not provided.", BAD_REQUEST);
	if (!timings)
		return sendError(res, "Timings is not provided.", BAD_REQUEST);
	return next();
};

module.exports.messageValidation = (req, res, next) => {
	let { name, email, phone, message } = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!phone || !phoneRegex.test(Number(phone)))
		return sendError(res, "Phone is not valid.", BAD_REQUEST);
	if (!message)
		return sendError(res, "Message is not provided.", BAD_REQUEST);
	return next();
};

module.exports.donorValidation = (req, res, next) => {
	let { name, email, phone, address, amount } = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!phone || !phoneRegex.test(Number(phone)))
		return sendError(res, "Phone is not valid.", BAD_REQUEST);
	if (!address)
		return sendError(res, "Address is not provided.", BAD_REQUEST);
	if (!amount || Number(amount) < 1 || Number(amount) > 10000000)
		return sendError(
			res,
			"Amount can be between 1 and 10000000.",
			BAD_REQUEST
		);
	return next();
};
