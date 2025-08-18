const { body } = require('express-validator');

exports.behaviorValidator = [
    body('student_id').isInt({ min: 1 }).withMessage('Invalid student_id'),
    body('description').isLength({ min: 1 }).withMessage('Invalid description'),
    body('date').isISO8601().withMessage('Invalid date'),
    body('type').isIn(['bad', 'good']).withMessage('Invalid type'),
];
