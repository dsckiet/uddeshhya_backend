const mongoose = require("mongoose");
const { logger } = require("../utility/helpers");
const { SERVER_ERROR } = require("../utility/statusCodes");
const { NODE_ENV, MONGO_URI } = require("./index");

// Map global promises
mongoose.Promise = global.Promise;

// Debugg mongo
if (NODE_ENV === "development") mongoose.set("debug", true);

// Mongoose Connect
connectDb = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.info("MongoDB Connected");
	} catch (err) {
		console.info(err);
		logger(
			"error",
			"database",
			{
				message: err.message,
				stack: err.stack,
				status: err.status || SERVER_ERROR
			},
			err
		);
	}
};
connectDb();
