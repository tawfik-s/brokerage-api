const winston = require('winston');
const { combine, timestamp, json } = winston.format;
const moment = require('moment');

const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: './logs/info.log',
        }),
        new winston.transports.Console()
    ],
});


const logger = (req, res, next) => {

    log.info(`${moment().format()} : ${req.protocol} : ${req.get('host')} : ${req.originalUrl}`);

    next();
}

module.exports = logger;