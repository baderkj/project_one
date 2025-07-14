const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{optionValidator}=require('../validators/optionValidator');
router.post('/',optionValidator, optionController.createOption);
router.get('/', optionController.getAllOptions);
router.get('/:id', optionController.getOption);
router.put('/:id', optionController.updateOption);
router.delete('/:id', optionController.deleteOption);


//authMiddleware,checkRoles(['admin']),
module.exports = router;