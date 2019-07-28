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
		aboutUddeshhya,
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
		!aboutUddeshhya ||
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
