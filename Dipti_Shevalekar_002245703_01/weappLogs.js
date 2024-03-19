const winston = require('winston');

// const logFilePath = './webapp.log';
// if (!fs.existsSync(logFilePath)) {
//     fs.writeFileSync(logFilePath, '', { flag: 'w' });
// }

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
 
    return `{"timestamp" : ${timestamp} 
              "Severity" : ${level.toUpperCase()}
              "Message" : ${message}}`;
});

const WebappLogging = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.json(), 
    winston.format.timestamp(), 
    logFormat
    ),

  transports: [
    new winston.transports.File({ filename: '/var/log/webapp.log' }),
    new winston.transports.Console(),
  ],
});

module.exports = WebappLogging;
