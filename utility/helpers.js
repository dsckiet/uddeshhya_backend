const log4js = require("log4js");
const { OK } = require("./statusCodes");

log4js.configure({
	appenders: {
		server: { type: "file", filename: "logs/server.log" },
		database: { type: "file", filename: "logs/database.log" },
		app: { type: "file", filename: "logs/app.log" }
	},
	categories: {
		server: { appenders: ["server"], level: "DEBUG" },
		database: { appenders: ["database"], level: "DEBUG" },
		app: { appenders: ["app"], level: "DEBUG" },
		default: { appenders: ["app"], level: "DEBUG" }
	}
});
let logger = log4js.getLogger();
logger.level = "debug";

module.exports.sendError = (res, message, status) => {
	return res.status(status).json({
		message,
		error: true,
		data: null
	});
};

module.exports.sendSuccess = (res, data, token) => {
	if (token) {
		return res
			.status(OK)
			.header("x-auth-token", token)
			.json({
				message: "success",
				error: false,
				...data
			});
	}
	return res.status(OK).json({
		message: "success",
		error: false,
		...data
	});
};

module.exports.toTitleCase = str => {
	return str
		.toLowerCase()
		.split(" ")
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

module.exports.logger = (type, category, logObject, err) => {
	logger = log4js.getLogger(category);
	if (type === "error") logger.error(logObject);
	else if (type === "fatal") logger.fatal(logObject);
	else if (type === "info") logger.info(logObject);
	else if (type === "warn") logger.warn(logObject);
	else if (type === "debug") logger.debug(logObject);
	else if (type === "trace") logger.trace(logObject);
};

const NS_PER_SEC = 1e9;
const NS_TO_MS = 1e6;

module.exports.formatHrTime = hrt => {
	return (hrt[0] * NS_PER_SEC + hrt[1]) / NS_TO_MS;
};
