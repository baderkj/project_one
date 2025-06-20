const express = require('express');
const router = express.Router();
const academicYearController = require('../controllers/academicYearController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{academicYearValidator}=require('../validators/academicYearValidator');
router.post('/',academicYearValidator,authMiddleware,checkRoles(['admin']), academicYearController.createAcademicYear);
router.get('/', academicYearController.getAllAcademicYeares);
// router.get('/students', academicYearController.getStudentsInClass);
router.get('/:id', academicYearController.getAcademicYear);
router.put('/:id', academicYearController.updateAcademicYear);
router.delete('/:id', academicYearController.deleteAcademicYear);


//authMiddleware,checkRoles(['admin']),
module.exports = router;