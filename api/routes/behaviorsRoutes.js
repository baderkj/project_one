const express = require('express');
const router = express.Router();
const BehaviorController = require('../controllers/behaviorController');
const authMiddleware = require('../../middleware/authMiddleware');
const hasPermission = require('../../middleware/hasPermission');

router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_behaviors'),
  BehaviorController.getAll
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_behavior'),
  BehaviorController.getById
);
router.post(
  '/',
  authMiddleware,
  hasPermission('create_behavior'),
  BehaviorController.create
);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_behavior'),
  BehaviorController.update
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_behavior'),
  BehaviorController.delete
);

module.exports = router;
