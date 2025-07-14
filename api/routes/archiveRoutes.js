const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/archiveController');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { archiveValidator } = require('../validators/archiveValidaor');
const hasPermission = require('../../middleware/hasPermission');

router.post(
  '/',
  archiveValidator,
  authMiddleware,
  hasPermission('create_archive'),
  archiveController.createArchive
);
router.get(
  '/',
  authMiddleware,
  hasPermission('get_all_archives'),
  archiveController.getAllArchives
);
router.get(
  '/:id',
  authMiddleware,
  hasPermission('get_archive'),
  archiveController.getArchive
);
router.put(
  '/:id',
  authMiddleware,
  hasPermission('update_archive'),
  archiveController.updateArchive
);
router.delete(
  '/:id',
  authMiddleware,
  hasPermission('delete_archive'),
  archiveController.deleteArchive
);

//authMiddleware,checkRoles(['admin']),
module.exports = router;
