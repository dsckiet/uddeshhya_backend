const razorpay = require('razorpay');
require('dotenv').config();

let rzp = new razorpay({
	key_id: process.env.RZP_KEY_ID,
	key_secret: process.env.RZP_KEY_SECRET
});

module.exports.createRzpOrder = async (amt, email) => {
	let options = {
		// amount in paise
		amount: Math.round(amt * 100 * 100) / 100,
		currency: 'INR',
		receipt: email,
		payment_capture: '1',
		notes: {
			message: `Donation at Uddeshhya`
		}
	};
	let order = await rzp.orders.create(options);
	return order;
};
