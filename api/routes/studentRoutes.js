const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { studentValidator } = require('../validators/studentValidator');
const hasPermission = require('../../middleware/hasPermission');


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
router.get('/schedule', studentController.getStudentSchedule);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_student'),
  studentController.getStudent
);

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
