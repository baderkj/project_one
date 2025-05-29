const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
// const productRoutes = require('./routes/productRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/teachers', teacherRoutes);
router.use('/students', studentRoutes);
router.use('/classes', classRoutes);
router.use('/subjects', subjectRoutes);
// router.use('/products', productRoutes);

module.exports = router;