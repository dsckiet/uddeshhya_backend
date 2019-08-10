const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
	name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    requestFor: { type: String, enum: ['self', 'other'] },
    require: { type: String, required: true, enum: ['platelets', 'blood'] },
    units: { type: Number, required: true },
    reason: { type: String },
    neededBy: { type: Date, required: true },
    timings: { type: String },
}, { timestamps: true }
);

module.exports = BloodRequest = mongoose.model('BloodRequest', BloodRequestSchema);