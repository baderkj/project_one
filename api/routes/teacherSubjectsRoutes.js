const express = require('express');
const router = express.Router();
const teacherSubectsController = require('../controllers/teacherSubectsController');
const { teacherSubjectsValidator } = require('../validators/teacherSubjectsValidator');
const authMiddleware = require('../../middleware/authMiddleware');
const hasPermission = require('../../middleware/hasPermission');

router.post(
  '/',
  teacherSubjectsValidator,
  authMiddleware,
  hasPermission('create_teachers_subjects'),
  teacherSubectsController.createTeachersSubects
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_teachers_subjects'),
  teacherSubectsController.getAllTeachersSubectss
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_teachers_subjects'),
  teacherSubectsController.getTeachersSubects
);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_teachers_subjects'),
  teacherSubectsController.updateTeachersSubects
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_teachers_subjects'),
  teacherSubectsController.deleteTeachersSubects
);

module.exports = router;
