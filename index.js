const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const { NODE_ENV, PORT } = require("./config/index");
const { notFound, sendErrors } = require("./config/errorHandler");
const { logRequestMiddleware } = require("./middlewares/log");

const app = express();

const cors = require("cors");
require("dotenv").config();
require("./config/dbconnection");

app.use(logRequestMiddleware);
app.use(compression());
app.use(helmet());
app.use(
	cors({
		exposedHeaders: "x-auth-token"
	})
);
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 1000000
	})
);
app.use(
	bodyParser.json({
		limit: "50mb",
		extended: true,
		parameterLimit: 1000000
	})
);

if (NODE_ENV === "production") {
	console.log = console.warn = console.error = () => {};
}

// load schemas
const User = require("./models/User");
const Volunteer = require("./models/Volunteer");
const Project = require("./models/Project");
const Team = require("./models/Team");
const BloodDonor = require("./models/BloodDonor");
const bloodRequest = require("./models/BloodRequest");
const Message = require("./models/Message");
const Donation = require("./models/Donation");
const Log = require("./models/Log");

// load routes
app.use("/api/v1", require("./routes/api/v1/index"));
app.use("/api/v1/admin", require("./routes/api/v1/admin"));
app.use("/api/v1/users", require("./routes/api/v1/users"));
app.use("/api/v1/projects", require("./routes/api/v1/projects"));
app.use("/api/v1/team", require("./routes/api/v1/team"));
app.use("/api/v1/bloodPortal", require("./routes/api/v1/bloodPortal"));
app.use("/api/v1/donate", require("./routes/api/v1/donate"));

// 404 route
app.use("*", notFound);

//Error Handlers
app.use(sendErrors);

// Allowing headers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	next();
});

//Setting up server
(async () => {
	try {
		await app.listen(PORT);
		console.info(
			`NODE_ENV: ${NODE_ENV}\nServer is up and running on Port ${PORT}`
		);
	} catch (err) {
		console.info("Error in running server.");
	}
})();
