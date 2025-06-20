const express = require('express');
const router = express.Router();
const periodController = require('../controllers/periodController');
//const {checkRoles}=require('../../middleware/roleMiddleware');
//const authMiddleware=require('../../middleware/authMiddleware');
const{periodValidator}=require('../validators/periodValidator');
router.post('/', periodValidator,periodController.createPeriod);
router.get('/', periodController.getAllPeriods);
router.get('/:id', periodController.getPeriod);
router.put('/:id', periodController.updatePeriod);
router.delete('/:id', periodController.deletePeriod);

module.exports=router;