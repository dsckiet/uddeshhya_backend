const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_RESOURCE_FOLDER
} = require("../config/index");
const { logger } = require("../utility/helpers");

//Configure cloudinary
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

//define storage
const storage = cloudinaryStorage({
	cloudinary,
	folder: (req, file, next) => {
		next(
			undefined,
			`${CLOUDINARY_RESOURCE_FOLDER}/${req.baseUrl.split("/")[3]}`
		);
	},
	allowedFormat: ["jpg", "jpeg", "png", "gif"],
	transformation: [{ width: 300, height: 300, crop: "limit" }]
});

//multer upload image
module.exports.upload = multer({ storage });

// delete a file
module.exports.deleteImg = async imgId => {
	try {
		let result = await cloudinary.v2.api.delete_resources([imgId]);
		return result;
	} catch (err) {
		console.info(err);
		logger(
			"error",
			"server",
			{
				message: err.message,
				stack: err.stack,
				status: err.status || SERVER_ERROR
			},
			err
		);
		return;
	}
};
