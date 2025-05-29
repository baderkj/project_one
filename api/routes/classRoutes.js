const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{classValidator}=require('../validators/classValidator');
router.post('/',classValidator,authMiddleware,checkRoles(['admin']), classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/students', classController.getStudentsInClass);
router.get('/:id', classController.getClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);


//authMiddleware,checkRoles(['admin']),
module.exports = router;