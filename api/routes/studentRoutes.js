const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{studentValidator}=require('../validators/studentValidator');

router.post('/', studentValidator,authMiddleware,checkRoles(['admin']),studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/subjects', studentController.getStudentSubjects);
router.get('/class', studentController.getClass);
router.get('/archive', studentController.getStudentArchive);
router.get('/:id', studentController.getStudent);

router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);


//authMiddleware,checkRoles(['admin']),
module.exports = router;