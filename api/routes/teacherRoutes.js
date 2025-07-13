const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { body, validationResult } = require('express-validator');
<<<<<<< HEAD
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { teacherValidator } = require('../validators/teacherValidator');
const hasPermission = require('../../middleware/hasPermission');
=======
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{teacherValidator}=require('../validators/teacherValidator');
router.post('/',teacherValidator,authMiddleware,checkRoles(['admin']), teacherController.createTeacher);
router.get('/', teacherController.getAllTeachers);
router.get('/subjects', teacherController.getSubjects);
router.get('/schedule', teacherController.getTeacherSchedule);
router.get('/:id', teacherController.getTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);
>>>>>>> ed7006f460fc443032659759ef1532a35edcf456

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
