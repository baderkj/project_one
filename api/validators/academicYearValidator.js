const { body } = require('express-validator');

exports.academicYearValidator = [
  body('start_year').isDate().withMessage('invalid start year'),
  body('end_year').isDate().withMessage('invalid end year'),,

];