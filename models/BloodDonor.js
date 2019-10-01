const mongoose = require('mongoose');

const BloodDonorSchema = new mongoose.Schema({
	name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
	address: { type: String, required: true },
	hasDonated: { type: Boolean, required: true },
}, { timestamps: true }
);

module.exports = BloodDonor = mongoose.model('BloodDonor', BloodDonorSchema);