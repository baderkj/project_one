const { body } = require('express-validator');

exports.classValidator = [
  body('class_name').isString().withMessage('Invalid class_name'),
  body('floor_number').isInt({min:1}).withMessage('Invalid floor_number'),

];