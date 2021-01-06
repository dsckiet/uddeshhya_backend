const razorpay = require("razorpay");
const { RZP_KEY_ID, RZP_KEY_SECRET } = require("../config/index");

let rzp = new razorpay({
	key_id: RZP_KEY_ID,
	key_secret: RZP_KEY_SECRET
});

module.exports.createRzpOrder = async (amt, email) => {
	let options = {
		// amount in paise
		amount: Math.round(amt * 100 * 100) / 100,
		currency: "INR",
		receipt: email,
		payment_capture: "1",
		notes: {
			message: `Donation at Uddeshhya`
		}
	};
	let order = await rzp.orders.create(options);
	return order;
};
