const chalk = require("chalk");
const { formatHrTime } = require("../utility/helpers");

module.exports.logRequestMiddleware = (req, res, next) => {
	const startTime = new Date();
	const startTimeHrt = process.hrtime();

	res.on("finish", () => {
		const requestDuration = formatHrTime(process.hrtime(startTimeHrt));
		const statusCode =
			res.statusCode >= 300 && res.statusCode < 400
				? 200
				: res.statusCode;
		let statusLog;
		if (statusCode < 400) {
			statusLog = chalk.green;
		} else if (statusCode < 500) {
			statusLog = chalk.yellow;
		} else {
			statusLog = chalk.red;
		}

		console.log(
			chalk.cyan(`[${startTime.toLocaleString()}]`),
			chalk.magenta(req.method),
			req.originalUrl,
			statusLog(statusCode),
			chalk.yellow(`${Math.round(requestDuration * 100) / 100} ms`)
		);
		if (req.body && Object.keys(req.body).length)
			console.log(chalk.blue(JSON.stringify(req.body, null, 2)));

		let parsedPathName = req.originalUrl.split("?").shift();
		Log.create({
			route: `${req.method} ${
				parsedPathName[parsedPathName.length - 1] === "/"
					? parsedPathName.slice(0, -1)
					: parsedPathName
			}`,
			duration: requestDuration,
			time: startTime,
			context: {
				body: req.body,
				query: req.query,
				user: req.user
			},
			status:
				res.statusCode >= 300 && res.statusCode < 400
					? 200
					: res.statusCode
		});
	});
	next();
};
