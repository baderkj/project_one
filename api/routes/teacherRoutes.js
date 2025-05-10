const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { body, validationResult } = require('express-validator');

const{teacherValidator}=require('../validators/teacherValidator');
router.post('/',teacherValidator, teacherController.createTeacher);
router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;