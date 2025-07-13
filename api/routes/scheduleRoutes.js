const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
//const {checkRoles}=require('../../middleware/roleMiddleware');
//const authMiddleware=require('../../middleware/authMiddleware');
const { scheduleValidator } = require('../validators/scheduleValidator');
const hasPermission = require('../../middleware/hasPermission');
const authMiddleware = require('../../middleware/authMiddleware');

router.post(
  '/',
  scheduleValidator,
  authMiddleware,
  hasPermission('create_schedule'),
  scheduleController.createSchedule
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_schedule'),
  scheduleController.getAllSchedules
);
router.get(
  '/classes',
  authMiddleware,
  hasPermission('get_schedule_classes'),
  scheduleController.getClasses
);
router.get(
  '/subjects',
  authMiddleware,
  hasPermission('get_schedule_subjects'),
  scheduleController.getSubjects
);
router.get(
  '/periods',
  authMiddleware,
  hasPermission('get_periods'),
  scheduleController.getPeriods
);
router.get(
  '/days',
  authMiddleware,
  hasPermission('get_days'),
  scheduleController.getDays
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_schedule'),
  scheduleController.getSchedule
);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_scedule'),
  scheduleController.updateSchedule
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_scedule'),
  scheduleController.deleteSchedule
);

module.exports = router;
