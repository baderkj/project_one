const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { checkRoles } = require('../../middleware/roleMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { examValidator } = require('../validators/examValidator');
const hasPermission = require('../../middleware/hasPermission');

router.post(
    '/',
    examValidator,
    authMiddleware,
    hasPermission('create_exam'),
    examController.createExam
);
router.get(
    '/',
    authMiddleware,
    hasPermission('get_all_exam'),
    examController.getAllExams
);
router.get(
    '/student-preexams',
    authMiddleware,
    hasPermission('get_all_preexam_of_semester'),
    examController.getAllPreExamsForSemester
);
router.get(
    '/student-nextexams',
    authMiddleware,
    hasPermission('get_all_next_exam'),
    examController.getUpComingExam
);
router.get(
    '/subject/:subject_id/semesters',
    authMiddleware,
    hasPermission('get_all_semesters_by_subject_fot_preexams'),
    examController.getsemestersBySubjectForPreExam
);
router.get(
    '/questions',
    authMiddleware,
    hasPermission('get_exam_questions'),
    examController.getExamQuestion
);
// router.get(
//     '/:id/questions_and_answers',
//     authMiddleware,
//     hasPermission('get_exam_questions'),
//     examController.getExamQuestionsWithAnswers
// );
router.get(
    '/:id',
    authMiddleware,
    hasPermission('get_exam'),
    examController.getExam
);
router.put(
    '/:id',
    authMiddleware,
    hasPermission('update_exam'),
    examController.updateExam
);
router.delete(
    '/:id',
    authMiddleware,
    hasPermission('delete_exam'),
    examController.deleteExam
);

//authMiddleware,checkRoles(['admin']),
module.exports = router;
