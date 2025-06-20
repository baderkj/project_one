const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/archiveController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{archiveValidator}=require('../validators/archiveValidaor');
router.post('/',archiveValidator,authMiddleware,checkRoles(['admin']), archiveController.createArchive);
router.get('/', archiveController.getAllArchives);
router.get('/:id', archiveController.getArchive);
router.put('/:id', archiveController.updateArchive);
router.delete('/:id', archiveController.deleteArchive);


//authMiddleware,checkRoles(['admin']),
module.exports = router;