const { body } = require('express-validator');
const allowedRoles = ['admin', 'student', 'teacher', 'data_entry'];
exports.UserValidator = [
  body('name').isLength({ min: 3 }).withMessage('Username must be at least 5 chars'),
  body('email').isEmail().withMessage('Invalid email'),
  body('phone').isLength({min:10}).withMessage('Invalid phone'),
  body('birth_date').isDate().withMessage('Invalid birth_date'),
  
  body('role').isIn(allowedRoles).withMessage('Invalid role'),
  body('password').isLength({ min:8 }).withMessage('Password must be at least 6 chars')
];