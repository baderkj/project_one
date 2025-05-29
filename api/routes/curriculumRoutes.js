const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');
const {checkRoles}=require('../../middleware/roleMiddleware');
const authMiddleware=require('../../middleware/authMiddleware');
const{curriculumValidator}=require('../validators/curriculumValidator');
router.post('/',curriculumValidator,authMiddleware,checkRoles(['admin']), curriculumController.createCurriculum);
router.get('/', curriculumController.getAllCurriculums);
router.get('/:id', curriculumController.getCurriculum);
router.put('/:id', curriculumController.updateCurriculum);
router.delete('/:id', curriculumController.deleteCurriculum);


//authMiddleware,checkRoles(['admin']),
module.exports = router;