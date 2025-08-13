const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const hasPermission = require('../../middleware/hasPermission');
const authMiddleware = require('../../middleware/authMiddleware');
const { teacherValidator } = require('../validators/teacherValidator');

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
  '/questions',
  authMiddleware,
  // hasPermission('get_teacher_questions'),
  teacherController.getQuestions
);
router.get(
  '/subjects',
  authMiddleware,
  hasPermission('get_teacher_subjects'),
  teacherController.getSubjects
);
router.get(
  '/schedule',
  authMiddleware,
  // hasPermission('get_teacher_schedule'),
  teacherController.getTeacherSchedule
);
router.get(
  '/classes',
  authMiddleware,
  // hasPermission('get_teacher_classes'),
  teacherController.getClassesByTeacher
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_teacher'),
  teacherController.getTeacher
);
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
