const { body } = require('express-validator');

exports.scheduleValidator = [
    body('start_time').isISO8601().withMessage('Invalid start_time'),
    body('end_time').isISO8601().withMessage('Invalid end_time'),
];

