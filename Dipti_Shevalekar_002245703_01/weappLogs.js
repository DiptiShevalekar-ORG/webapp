const winston = require('winston');
const { createLogger, format, transports } = winston;

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp }) => {
            return JSON.stringify({
                severity: level.toUpperCase(),
                message,
                timestamp
            });
        })
    ),
    transports: [
        new winston.transports.File({
            filename: '/var/log/webapp.log',
        }),
    ]});

module.exports = logger;
