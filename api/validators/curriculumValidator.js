const { body } = require('express-validator');

exports.curriculumValidator = [
  body('level_grade').isString().withMessage('Invalid class_name'),
  body('is_active').isBoolean().withMessage('Invalid is_active'),
  body('created_by').isInt({min:1}).withMessage('Invalid created_by'),
];