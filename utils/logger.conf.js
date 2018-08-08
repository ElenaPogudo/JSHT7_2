'use strict';

const { configure, getLogger } = require('log4js');


configure({
    appenders: {
        error: { type: 'file', filename: './logs/error.log' },
        combine: { type: 'file', filename: './logs/combine.log' },
        out: { type: 'stdout' },
        errors: { type: 'logLevelFilter', appender: 'error', level: 'error' }
    },
    categories: {
        default: { appenders: ['out'], level: 'trace' },
        REST: { appenders: ['errors', 'combine', 'out'], level: 'trace' }
    }
});
const logger = getLogger('REST');

module.exports = logger;
