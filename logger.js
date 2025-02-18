const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set the default log level (adjust as needed)
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss' // Customize timestamp format
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console() // Log to the console
    // You can add other transports here, like file logging
    // new winston.transports.File({ filename: 'combined.log' }),
    // new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ],
});


module.exports = logger;