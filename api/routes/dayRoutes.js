const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');
//const {checkRoles}=require('../../middleware/roleMiddleware');
//const authMiddleware=require('../../middleware/authMiddleware');
const{dayValidator}=require('../validators/dayValidator');
router.post('/', dayValidator,dayController.createDay);
router.get('/', dayController.getAllDays);
router.get('/:id', dayController.getDay);
router.put('/:id', dayController.updateDay);
router.delete('/:id', dayController.deleteDay);

module.exports = router;