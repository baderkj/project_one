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
const roleRoutes = require('./routes/roleRoutes');
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
router.use('/roles', roleRoutes);

module.exports = router;
