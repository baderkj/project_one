const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { body, validationResult } = require('express-validator');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { teacherValidator } = require('../validators/teacherValidator');
const hasPermission = require('../../middleware/hasPermission');

router.post(
  '/',
  teacherValidator,
  authMiddleware,
  hasPermission('create_teacher'),
  teacherController.createTeacher
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_teachers'),
  teacherController.getAllTeachers
);
router.get(
  '/subjects',
  authMiddleware,
  hasPermission('get_teacher_subjects'),
  teacherController.getSubjects
);
router.get('/:id', hasPermission('get_teacher'), teacherController.getTeacher);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_teacher'),
  teacherController.updateTeacher
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_teacher'),
  teacherController.deleteTeacher
);

module.exports = router;
