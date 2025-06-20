const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
//const {checkRoles}=require('../../middleware/roleMiddleware');
//const authMiddleware=require('../../middleware/authMiddleware');
const{scheduleValidator}=require('../validators/scheduleValidator');
router.post('/', scheduleValidator,scheduleController.createSchedule);
router.get('/', scheduleController.getAllSchedules);
router.get('/classes', scheduleController.getClasses);
router.get('/subjects', scheduleController.getSubjects);
router.get('/periods', scheduleController.getPeriods);
router.get('/days', scheduleController.getDays);
router.get('/:id', scheduleController.getSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports=router;