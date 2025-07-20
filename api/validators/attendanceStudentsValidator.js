const { body } = require('express-validator');

exports.attendanceStudentsValidator = [
  body('student_id').isInt({min:1}).withMessage('Invalide student id'),
  body('created_by').isInt({min:1}).withMessage('Invalide created by '),
  body('date').isDate().withMessage('Invalide remianing date  '),
  body('status').isIn(["present","absent","late"]).withMessage('Invalide status'),
];