// regex definitions
let emailRegex = /\S+@\S+/,
	phoneRegex = /(^[6-9][0-9]{9})$/gm,
	passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})');

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
		!alternatePhone ||
		!currentAddress ||
		!permanentAddress ||
		!branch ||
		!year ||
		!bloodgroup ||
		!college ||
		!aboutUddeshhya ||
		!heardFrom ||
		!workSpan ||
		!skills
	) {
		res.status(400).json({ message: 'Some required fields are missing!!' });
	}

	// branch, year, blood group values will be fixed in dropdown, need not to be validated!!
	// validate inputs
	if (emailRegex.test(email)) {
		if (phoneRegex.test(phone) && phoneRegex.test(alternatePhone)) {
			return next();
		} else {
			res.status(400).json({ message: 'Contact no(s) not valid!!' });
		}
	} else {
		res.status(400).json({ message: 'Email address not valid!!' });
	}
};

module.exports.projectValidation = (req, res, next) => {
	let { title, description } = req.body;
	if (!title || !description) {
		res.status(400).json({ message: 'All fields are mandatory!!' });
	} else if (!req.file) {
		res.status(400).json({ message: 'Please upload an image!!' });
	} else {
		return next();
	}
};
