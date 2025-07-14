const express = require('express');
const router = express.Router();
const examQuestionController = require('../controllers/examQuestionController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{examValidator}=require('../validators/examValidator');
router.post('/', examQuestionController.createExamQuestion);
router.get('/', examQuestionController.getAllExamQuestions);
router.get('/:id', examQuestionController.getExamQuestion);
router.put('/:id', examQuestionController.updateExamQuestion);
router.delete('/:id', examQuestionController.deleteExamQuestion);


//authMiddleware,checkRoles(['admin']),
module.exports = router;