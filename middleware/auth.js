const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.allAuth = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res
			.status(401)
			.json({ message: 'Access denied. No Token provided' });
	} else {
		const decodedPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.user = decodedPayload;
		return next();
	}
};

module.exports.adminAuth = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res
			.status(401)
			.json({ message: 'Access denied. No Token provided' });
	} else {
		const decodedPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		if (decodedPayload.role === 'admin') {
			req.user = decodedPayload;
			return next();
		} else {
			return res.status(403).json({ message: 'Access denied.' });
		}
	}
};
