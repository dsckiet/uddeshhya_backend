require("dotenv").config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	MONGO_URI:
		process.env.NODE_ENV === "production"
			? process.env.MONGO_URI_PROD
			: process.env.NODE_ENV === "staging"
			? process.env.MONGO_URI_STAGING
			: process.env.MONGO_URI_DEV,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_RESOURCE_FOLDER: process.env.CLOUDINARY_RESOURCE_FOLDER,
	JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
	RZP_KEY_ID: process.env.RZP_KEY_ID,
	RZP_KEY_SECRET: process.env.RZP_KEY_SECRET
};
