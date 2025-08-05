// api/routes/tuitionPaymentRoutes.js
const express = require('express');
const router = express.Router();
const tuitionPaymentController = require('../controllers/tuitionPaymentController');
const {
    createTuitionPaymentValidation,
    updateTuitionPaymentValidation,
    getPaymentValidation,
    getStudentPaymentsValidation,
    bulkCreatePaymentsValidation,
    dateRangeValidation,
    paymentStatsValidation,
    getAllPaymentsValidation,
    verifyPaymentValidation,
} = require('../validators/tuitionPaymentValidator');

const hasPermission = require('../../middleware/hasPermission');
const authMiddleware = require('../../middleware/authMiddleware');

router.use(authMiddleware);

// Create a new tuition payment
router.post(
    '/',
    createTuitionPaymentValidation,
    tuitionPaymentController.createTuitionPayment
);

// Bulk create tuition payments
router.post(
    '/bulk',
    bulkCreatePaymentsValidation,
    tuitionPaymentController.bulkCreatePayments
);

// Get all tuition payments with optional filters
router.get(
    '/',
    getAllPaymentsValidation,
    tuitionPaymentController.getAllTuitionPayments
);

// Get payment statistics
router.get(
    '/stats',
    paymentStatsValidation,
    tuitionPaymentController.getPaymentStats
);

// Get payments by date range
router.get(
    '/date-range',
    dateRangeValidation,
    tuitionPaymentController.getPaymentsByDateRange
);

// Get outstanding payments
router.get('/outstanding', tuitionPaymentController.getOutstandingPayments);

// Get a specific tuition payment by ID
router.get(
    '/:id',
    getPaymentValidation,
    tuitionPaymentController.getTuitionPayment
);

// Update a tuition payment
router.put(
    '/:id',
    updateTuitionPaymentValidation,
    tuitionPaymentController.updateTuitionPayment
);

// Verify a payment
router.patch(
    '/:id/verify',
    verifyPaymentValidation,
    tuitionPaymentController.verifyPayment
);

// Delete a tuition payment
router.delete(
    '/:id',
    getPaymentValidation,
    tuitionPaymentController.deleteTuitionPayment
);

// Get payments for a specific student
router.get(
    '/student/:student_id',
    getStudentPaymentsValidation,
    tuitionPaymentController.getStudentPayments
);

// Get total payment amount for a specific student
router.get(
    '/student/:student_id/total',
    getStudentPaymentsValidation,
    tuitionPaymentController.getStudentPaymentTotal
);

// Get student balance (paid, remaining, percentage)
router.get(
    '/student/:student_id/balance',
    getStudentPaymentsValidation,
    tuitionPaymentController.getStudentBalance
);

module.exports = router;
