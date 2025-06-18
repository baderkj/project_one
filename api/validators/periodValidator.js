const { body } = require('express-validator');

exports.scheduleValidator = [
    body('start_time').isDate().withMessage('Invalid start_time'),
    body('end_time').isDate().withMessage('Invalid end_time'),
];

