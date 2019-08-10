// regex definitions
let emailRegex = /\S+@\S+\.\S+/;
(phoneRegex = /([0-9]{10})/),
	(passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})'));

module.exports.userValidation = (req, res, next) => {
	let { name, email, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json({ message: 'All fields are mandatory!!' });
	}
	if (emailRegex.test(email)) {
		if (passwordRegex.test(password)) {
			return next();
		} else {
			res.status(400).json({
				message:
					'Password must be atleast 6 characters long and contain atleast one alphabet and number!!'
			});
		}
	} else {
		res.status(400).json({ message: 'EmailID not valid!!' });
	}
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
		suggestion
	} = req.body;

	// checking required fields
	if (
		!email ||
		!name ||
		!phone ||
		!currentAddress ||
		!permanentAddress ||
		!branch ||
		!year ||
		!bloodgroup ||
		!college ||
		// !aboutUddeshhya ||
		!heardFrom ||
		!workSpan
	) {
		res.status(400).json({ message: 'Some required fields are missing!!' });
	}

	// branch, year, blood group values will be fixed in dropdown, need not to be validated!!
	// validate inputs
	if (emailRegex.test(email)) {
		if (phoneRegex.test(Number(phone))) {
			if (!alternatePhone || phoneRegex.test(alternatePhone)) {
				return next();
			} else {
				res.status(400).json({
					message: 'Alternate Contact not valid!!'
				});
			}
		} else {
			res.status(400).json({ message: 'Contact not valid!!' });
		}
	} else {
		res.status(400).json({ message: 'Email address not valid!!' });
	}
};

module.exports.projectValidation = (req, res, next) => {
	let { title, description } = req.body;
	if (!title || !description) {
		res.status(400).json({ message: 'All fields are mandatory!!' });
	} else {
		return next();
	}
};

module.exports.teamValidation = (req, res, next) => {
	let { name, position, fb, insta, linkedin, phone, email } = req.body;
	if (!name || !position) {
		res.status(400).json({ message: 'Name and Position are mandatory!!' });
	}
	if (!phone || phoneRegex.test(phone)) {
		if (!email || emailRegex.test(email)) {
			return next();
		} else {
			res.status(400).json({ message: 'Email address not valid!!' });
		}
	} else {
		res.status(400).json({ message: 'Phone number not valid!!' });
	}
};

module.exports.donorValidation = (req, res, next) => {
	let {
		name,
		bloodGroup,
		phone,
		email,
		dob, // format: YYYY/MM/DD
		address,
		hasDonated
	} = req.body;

	if (!name || !bloodGroup || !phone || !email || !dob || !address) {
		res.status(400).json({ message: 'All fields are mandtaory!!' });
	}
	// 18 yrs from dob
	let newDate = new Date(
		new Date(dob).setFullYear(new Date(dob).getFullYear() + 18)
	);

	// test fields
	if (emailRegex.test(email)) {
		if (phoneRegex.test(Number(phone))) {
			if (newDate <= new Date(Date.now())) {
				return next();
			} else {
				res.status(400).json({
					message: 'Must be atleast 18 yrs old!!'
				});
			}
		} else {
			res.status(400).json({ message: 'Contact not valid!!' });
		}
	} else {
		res.status(400).json({ message: 'Email address not valid!!' });
	}
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
	if (
		!name ||
		!bloodGroup ||
		!phone ||
		!dob ||
		!address ||
		!pincode ||
		!require ||
		!units ||
		!neededBy ||
		!timings
	) {
		res.status(400).json({ message: 'Some fields are missing!!' });
	}

	let pincodeRegex = /(^[0-9]{6}$)/gm;
	let unitsRegex = /(^[1-4]{1}$)/gm;

	if (phoneRegex.test(Number(phone))) {
		if (pincodeRegex.test(Number(pincode))) {
			if (unitsRegex.test(Number(units))) {
				return next();
			} else {
				res.status(400).json({
					message: 'Max. 4 units allowed!!'
				});
			}
		} else {
			res.status(400).json({ message: 'Pincode not valid!!' });
		}
	} else {
		res.status(400).json({ message: 'Contact not valid!!' });
	}
};

module.exports.messageValidation = (req, res, next) => {
	let { name, email, phone, message } = req.body;
	if (!email || !name || !message) {
		res.status(400).json({ message: 'Some fields are missing!!' });
	}
	if (emailRegex.test(email)) {
		if (phoneRegex.test(Number(phone))) {
			return next();
		} else {
			res.status(400).json({ message: 'Contact not valid!!' });
		}
	} else {
		res.status(400).json({ message: 'Email address not valid!!' });
	}
};
