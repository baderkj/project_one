const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const academicYearRoutes = require('./routes/academicYearRoutes');
const archiveRoutes = require('./routes/archiveRoutes');
const dayRoutes = require('./routes/dayRoutes');
const periodRoutes = require('./routes/periodRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const examRoutes = require('./routes/examRoutes');
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const examAttemptRoutes = require('./routes/examAttemptRoutes');
const examQuestionRoutes = require('./routes/examQuestionRoutes');
// const productRoutes = require('./routes/productRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/teachers', teacherRoutes);
router.use('/students', studentRoutes);
router.use('/classes', classRoutes);
router.use('/curriculums', curriculumRoutes);
router.use('/subjects', subjectRoutes);
router.use('/academic_years', academicYearRoutes);
router.use('/archives', archiveRoutes);
router.use('/days', dayRoutes);
router.use('/periods', periodRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/exams', examRoutes);
router.use('/questions', questionRoutes);
router.use('/options', optionRoutes);
router.use('/answers', answerRoutes);
router.use('/exam_attempts', examAttemptRoutes);
router.use('/exam_question', examQuestionRoutes);
module.exports = router;