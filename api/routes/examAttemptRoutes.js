const express = require('express');
const router = express.Router();
const examAttemptController = require('../controllers/examAttemptController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{examAttemptValidator}=require('../validators/examAttemptValidator');
const{examCorrectValidator}=require('../validators/examCorrectValidator');
router.post('/',examAttemptValidator, examAttemptController.createExamAttempt);
router.get('/', examAttemptController.getAllExamAttempts);
router.get('/check',examCorrectValidator, examAttemptController.gradeExam);
router.get('/:id', examAttemptController.getAllExamAttempts);
router.put('/:id', examAttemptController.updateExamAttempt);
router.delete('/:id', examAttemptController.deleteExamAttempt);


//authMiddleware,checkRoles(['admin']),
module.exports = router;