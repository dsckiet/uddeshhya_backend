const Multer = require("multer");
const path = require("path");

const { sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

const multer = Multer({
	storage: Multer.memoryStorage()
});

const imageFileFilter = (req, res, next) => {
	if (req.files && req.files.length !== 0) {
		let file = req.files[0];
		let ext = path.extname(file.originalname),
			type = file.mimetype.split("/");
		if (
			ext !== ".png" &&
			ext !== ".jpg" &&
			ext !== ".gif" &&
			ext !== ".jpeg" &&
			type[0] !== "image"
		) {
			return sendError(res, "Only Images allowed!!", BAD_REQUEST);
		}
		return next();
	} else {
		return next();
	}
};

module.exports = {
	multer,
	imageFileFilter
};
