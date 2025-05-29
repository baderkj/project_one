const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{subjectValidator}=require('../validators/subjectValidator');
router.post('/', subjectValidator,subjectController.createSubject);
router.get('/', subjectController.getAllSubjectes);
router.get('/:id', subjectController.getSubject);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);


//,subjectValidator,authMiddleware,checkRoles(['admin'])
module.exports = router;