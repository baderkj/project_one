const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { body, validationResult } = require('express-validator');
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

module.exports = router;