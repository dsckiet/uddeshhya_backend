const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/index");
const { sendError } = require("../utility/helpers");
const { NOT_AUTHORIZED, FORBIDDEN } = require("../utility/statusCodes");

module.exports.adminAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) return sendError(res, "Access denied.", NOT_AUTHORIZED);
	const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);
	if (decodedPayload.role !== "admin")
		return sendError(res, "Forbidden.", FORBIDDEN);
	req.user = decodedPayload;
	return next();
};
