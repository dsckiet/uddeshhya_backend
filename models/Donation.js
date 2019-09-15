const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
	name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    charges: { type: Number },
    finalAmount: { type: Number },
    order: { type: String, required: true },
    status: { type: String, default: 'pending' },
    transactionId: { type: String },
    signature: { type: String },
}, { timestamps: true }
);

module.exports = Donation = mongoose.model('Donation', DonationSchema);
