const { body } = require('express-validator');

exports.scheduleValidator = [
    body('name').isString().withMessage("Invalid name"),
    body('floor_number').isInt({ min: 1 }).withMessage("Invalid floor_number")
];

