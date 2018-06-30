import winston, { format, addColors } from 'winston';
const { combine, timestamp, prettyPrint, colorize, json } = format;

import { LOGGER } from '../../constants';

const logger = winston.createLogger({
    addColors: addColors(LOGGER.COLORS),
    format: combine(
        colorize(),
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'log/combined.log',
            level: LOGGER.DEFAULT_LEVEL
        }),
        new winston.transports.File({
            filename: 'log/errors.log',
            level: LOGGER.ERROR_LEVEL
        })
    ]
});

export default logger;