const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{answerValidator}=require('../validators/answerValidator');
router.post('/',answerValidator, answerController.createAnswer);
router.get('/', answerController.getAllAnswers);
router.get('/:id', answerController.getAnswer);
router.put('/:id', answerController.updateAnswer);
router.delete('/:id', answerController.deleteAnswer);


//authMiddleware,checkRoles(['admin']),
module.exports = router;