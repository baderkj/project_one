const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{examValidator}=require('../validators/examValidator');
router.post('/',examValidator, examController.createExam);
router.get('/', examController.getAllExams);
router.get('/questions', examController.getExamQuestion);
router.get('/:id', examController.getExam);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);


//authMiddleware,checkRoles(['admin']),
module.exports = router;