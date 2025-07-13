const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { studentValidator } = require('../validators/studentValidator');
const hasPermission = require('../../middleware/hasPermission');

<<<<<<< HEAD
router.post(
  '/',
  studentValidator,
  authMiddleware,
  hasPermission('create_student'),
  studentController.createStudent
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_students'),
  studentController.getAllStudents
);
router.get(
  '/subjects',
  authMiddleware,
  hasPermission('get_student_subjects'),
  studentController.getStudentSubjects
);
router.get(
  '/class',
  authMiddleware,
  hasPermission('get_student_class'),
  studentController.getClass
);
router.get(
  '/archive',
  authMiddleware,
  hasPermission('get_student_archive'),
  studentController.getStudentArchive
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_student'),
  studentController.getStudent
);
=======
router.post('/', studentValidator,authMiddleware,checkRoles(['admin']),studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/subjects', studentController.getStudentSubjects);
router.get('/class', studentController.getClass);
router.get('/archive', studentController.getStudentArchive);
router.get('/schedule', studentController.getStudentSchedule);
router.get('/:id', studentController.getStudent);

router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
>>>>>>> ed7006f460fc443032659759ef1532a35edcf456

router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_student'),
  studentController.updateStudent
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_student'),
  studentController.deleteStudent
);

//authMiddleware,checkRoles(['admin']),
module.exports = router;
