const { format } = require("logform");
const os = require('os')
const winston = require('winston')



const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${os.hostname}] [${level.toUpperCase()}]: ${message}`
    })
)


const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.Console()
    ]
})

module.exports = logger;