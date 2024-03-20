const winston = require('winston');
const { createLogger, format, transports } = winston;

const logger = createLogger({
    level: 'info',
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
        new winston.transports.Console()
    ]
});

module.exports = logger;
