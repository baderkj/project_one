const { body } = require('express-validator');

exports.scheduleValidator = [
    body('name').isString().withMessage("Invalid name")
];

