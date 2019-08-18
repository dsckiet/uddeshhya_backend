//rzp order creater
const { createRzpOrder } = require('../config/payment');
require('dotenv').config();

module.exports.createOrder = async (req, res) => {
	let { name, email, phone, address, amount, message } = req.body;
	try {
		amount = Math.round(Number(amount) * 100) / 100;
		let order = await createRzpOrder(amount, email);
		let donation = await Donation.findOne({ order: order.id });
		if (!donation) {
			let newDonation = {
				name,
				email,
				phone,
				address,
				amount,
				message,
				order: order.id
			};
			await Donation.create(newDonation);
		}
		res.status(200).json({
			message: 'success',
			order,
			key: process.env.RZP_KEY_ID
		});
	} catch (err) {
		res.status(500).json({ message: err.message, error: true, data: null });
	}
};

module.exports.payment = async (req, res) => {
	let {
		razorpay_payment_id,
		razorpay_order_id,
		razorpay_signature
	} = req.body;
	try {
		if (razorpay_payment_id) {
			let donation = await Donation.findOne({
				order: razorpay_order_id
			});
			let charges = Math.round(0.0233 * donation.amount * 100) / 100;
			let finalAmount =
				Math.round((donation.amount - charges) * 100) / 100;
			// payment details updation
			donation.status = 'success';
			donation.charges = charges;
			donation.finalAmount = finalAmount;
			donation.transactionId = razorpay_payment_id;
			donation.signature = razorpay_signature;
			await donation.save();
			res.status(200).json({ message: 'success' });
		} else {
			res.status(500).json({ message: 'Payment failed!!' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true, data: null });
	}
};
