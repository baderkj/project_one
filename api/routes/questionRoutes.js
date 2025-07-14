const express = require('express');
const router = express.Router();
const questionContoller = require('../controllers/questionContoller');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{questionValidator}=require('../validators/questionValidator');
router.post('/',questionValidator, questionContoller.createQuestion);
router.get('/', questionContoller.getAllQuestions);
router.get('/:id', questionContoller.getQuestion);
router.put('/:id', questionContoller.updateQuestion);
router.delete('/:id', questionContoller.deleteQuestion);


//authMiddleware,checkRoles(['admin']),
module.exports = router;