const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
// const productRoutes = require('./routes/productRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/teachers', teacherRoutes);
// router.use('/products', productRoutes);

module.exports = router;