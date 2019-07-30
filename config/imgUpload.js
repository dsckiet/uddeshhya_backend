const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

require('dotenv').config();

//Configure cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

//define storage
const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: (req, file, next) => {
		next(
			`${process.env.CLOUDINARY_RESOURCE_FOLDER}/${
				req.baseUrl.split('/')[3]
			}`
		);
	},
	allowedFormat: ['jpg', 'jpeg', 'png', 'gif'],
	transformation: [{ width: 300, height: 300, crop: 'limit' }]
});

//multer upload image
module.exports.upload = multer({ storage });

// delete a file
module.exports.deleteImg = async imgId => {
	try {
		let result = await cloudinary.v2.api.delete_resources([imgId]);
		return result;
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

// incomplete
// module.exports.viewImg = async () => {
// 	try {
// 		let result = await cloudinary.v2.api.resources({
// 		prefix: 'UDDESHYA/projects/'
// 	});
// 	console.log(result);
// 	return result;
// } catch (err) {
// 	res.status(500).json({ message: err.message, error: true });
// }
// };
