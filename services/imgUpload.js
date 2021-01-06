const multer = require("multer");
const cloudinary = require("cloudinary");
const sharp = require("sharp");

const {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_RESOURCE_FOLDER
} = require("../config/index");
const { logger } = require("../utility/helpers");
const { SERVER_ERROR } = require("../utility/statusCodes");

//Configure cloudinary
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

module.exports.uploadImage = async (file, key, folder) => {
	const processedImage = await sharp(file.buffer)
		.toFormat("jpeg")
		.jpeg({ quality: 95 })
		.toBuffer();

	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader
			.upload_stream(
				{
					resource_type: "auto",
					public_id: key,
					folder: `${CLOUDINARY_RESOURCE_FOLDER}/${folder}`
				},
				(err, result) => {
					if (err) {
						console.log(err);
						logger(
							"error",
							"storage",
							{
								type: "failure",
								message: err.message,
								status: err.status || SERVER_ERROR,
								stack: err.stack
							},
							err
						);
						resolve();
					} else {
						console.log(`Upload succeed`);
						console.log(result);
						logger("error", "storage", {
							type: "success",
							key,
							folder
						});
						return resolve(result);
					}
				}
			)
			.end(processedImage);
	});
};

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
