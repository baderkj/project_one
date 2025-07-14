const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { subjectValidator } = require('../validators/subjectValidator');
const hasPermission = require('../../middleware/hasPermission');

router.post(
  '/',
  subjectValidator,
  authMiddleware,
  hasPermission('create_subject'),
  subjectController.createSubject
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_subjects'),
  subjectController.getAllSubjectes
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_subject'),
  subjectController.getSubject
);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_subject'),
  subjectController.updateSubject
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_subject'),
  subjectController.deleteSubject
);

//,subjectValidator,authMiddleware,checkRoles(['admin'])
module.exports = router;
