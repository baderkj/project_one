const { body } = require('express-validator');

exports.teacherValidator = [
  body('name').isLength({ min: 3 }).withMessage('Username must be at least 5 chars'),
  body('email').isEmail().withMessage('Invalid email'),
  body('phone').isLength({min:10}).withMessage('Invalid phone'),
  body('birth_date').isDate().withMessage('Invalid birth_date'),
  body('specialization').isLength({min:3}).withMessage('Invalid birth_date'),
  body('hire_date').isDate().withMessage('Invalid hire date'),
  body('qualification').isLength({min:3}).withMessage('Invalid qualification'),
  body('password').isLength({ min:8 }).withMessage('Password must be at least 6 chars')
];