//rzp order creater
const { RZP_KEY_ID } = require("../config");
const { createRzpOrder } = require("../config/payment");
const { sendSuccess, sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");
require("dotenv").config();

module.exports.createOrder = async (req, res) => {
	let { name, email, phone, address, amount, message } = req.body;
	amount = Math.round(Number(amount) * 100) / 100;
	let order = await createRzpOrder(amount, email);
	let donation = await Donation.findOne({ order: order.id }).lean();
	if (!donation) {
		let newDonation = new Donation({
			name,
			email,
			phone,
			address,
			amount,
			message,
			order: order.id
		});
		await newDonation.save();
	}
	return sendSuccess(res, { order, key: RZP_KEY_ID });
};

module.exports.payment = async (req, res) => {
	let {
		razorpay_payment_id,
		razorpay_order_id,
		razorpay_signature
	} = req.body;
	if (!razorpay_payment_id)
		return sendError(res, "Payment Failed.", BAD_REQUEST);
	let donation = await Donation.findOne({
		order: razorpay_order_id
	}).lean();
	let charges = Math.round(0.0233 * donation.amount * 100) / 100;
	let finalAmount = Math.round((donation.amount - charges) * 100) / 100;
	// payment details updation
	donation.status = "success";
	donation.charges = charges;
	donation.finalAmount = finalAmount;
	donation.transactionId = razorpay_payment_id;
	donation.signature = razorpay_signature;
	donation = await donation.save();
	return sendSuccess(res, { donation });
};
