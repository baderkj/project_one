const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { classValidator } = require('../validators/classValidator');
const hasPermission = require('../../middleware/hasPermission');

router.post(
  '/',
  classValidator,
  authMiddleware,
  hasPermission('create_calss'),
  classController.createClass
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_classes'),
  classController.getAllClasses
);
router.get(
  '/students',
  authMiddleware,
  hasPermission('get_students_in_class'),
  classController.getStudentsInClass
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_class'),
  classController.getClass
);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_class'),
  classController.updateClass
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_class'),
  classController.deleteClass
);

//authMiddleware,checkRoles(['admin']),
module.exports = router;
