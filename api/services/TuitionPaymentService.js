const TuitionPayment = require('../models/TuitionPayment');
const knex = require('../config/database');

class TuitionPaymentService {
  static async getAllPayments(filters = {}, pagination = {}) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const offset = (page - 1) * limit;

      let countQuery = knex('tuition_payments');
      if (filters.student_id) {
        countQuery = countQuery.where('student_id', filters.student_id);
      }
      if (filters.payment_method) {
        countQuery = countQuery.where('payment_method', filters.payment_method);
      }
      if (filters.date_from) {
        countQuery = countQuery.where('payment_date', '>=', filters.date_from);
      }
      if (filters.date_to) {
        countQuery = countQuery.where('payment_date', '<=', filters.date_to);
      }

      const totalCount = await countQuery.count('id as count').first();
      const total = parseInt(totalCount.count);

      const payments = await TuitionPayment.findAll(filters);
      const paginatedPayments = payments.slice(offset, offset + limit);

      return {
        data: paginatedPayments,
        pagination: {
          current_page: page,
          per_page: limit,
          total: total,
          total_pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Error fetching payments: ${error.message}`);
    }
  }

  static async getPaymentById(id) {
    try {
      const payment = await TuitionPayment.findById(id);
      if (!payment) {
        throw new Error('Payment not found');
      }
      return payment;
    } catch (error) {
      throw new Error(`Error fetching payment: ${error.message}`);
    }
  }

  static async createPayment(paymentData, createdBy) {
    const transaction = await knex.transaction();

    try {
      const student = await transaction('students')
        .where('id', paymentData.student_id)
        .first();
      if (!student) {
        throw new Error('Student not found');
      }

      if (paymentData.archive_id) {
        const archive = await transaction('archive')
          .where('id', paymentData.archive_id)
          .first();
        if (!archive) {
          throw new Error('Archive record not found');
        }
      }

      const paymentToCreate = {
        ...paymentData,
        verified_by: createdBy,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const [paymentId] = await transaction('tuition_payments')
        .insert(paymentToCreate)
        .returning('id');

      if (paymentData.archive_id) {
        await transaction('archive')
          .where('id', paymentData.archive_id)
          .decrement('remaining_tuition', paymentData.amount);
      }

      await transaction.commit();

      return await this.getPaymentById(paymentId);
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  static async updatePayment(id, updateData, updatedBy) {
    const transaction = await knex.transaction();

    try {
      const existingPayment = await transaction('tuition_payments')
        .where('id', id)
        .first();
      if (!existingPayment) {
        throw new Error('Payment not found');
      }

      if (
        updateData.archive_id &&
        updateData.archive_id !== existingPayment.archive_id
      ) {
        if (existingPayment.archive_id) {
          await transaction('archive')
            .where('id', existingPayment.archive_id)
            .increment('remaining_tuition', existingPayment.amount);
        }

        if (updateData.archive_id) {
          await transaction('archive')
            .where('id', updateData.archive_id)
            .decrement(
              'remaining_tuition',
              updateData.amount || existingPayment.amount
            );
        }
      }

      if (
        updateData.amount &&
        updateData.amount !== existingPayment.amount &&
        existingPayment.archive_id
      ) {
        const amountDifference = updateData.amount - existingPayment.amount;
        await transaction('archive')
          .where('id', existingPayment.archive_id)
          .decrement('remaining_tuition', amountDifference);
      }

      const paymentToUpdate = {
        ...updateData,
        verified_by: updatedBy,
        updated_at: new Date(),
      };

      await transaction('tuition_payments')
        .where('id', id)
        .update(paymentToUpdate);

      await transaction.commit();

      return await this.getPaymentById(id);
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Error updating payment: ${error.message}`);
    }
  }

  static async deletePayment(id) {
    const transaction = await knex.transaction();

    try {
      const payment = await transaction('tuition_payments')
        .where('id', id)
        .first();
      if (!payment) {
        throw new Error('Payment not found');
      }

      if (payment.archive_id) {
        await transaction('archive')
          .where('id', payment.archive_id)
          .increment('remaining_tuition', payment.amount);
      }

      const result = await transaction('tuition_payments')
        .where('id', id)
        .del();
      await transaction.commit();

      return result > 0;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Error deleting payment: ${error.message}`);
    }
  }

  static async getStudentPayments(studentId) {
    try {
      const payments = await TuitionPayment.findByStudentId(studentId);
      const totalAmount = await TuitionPayment.getTotalAmountByStudent(
        studentId
      );

      return {
        payments,
        total_amount: totalAmount,
        payment_count: payments.length,
      };
    } catch (error) {
      throw new Error(`Error fetching student payments: ${error.message}`);
    }
  }

  static async getPaymentStatistics(filters = {}) {
    try {
      const stats = await TuitionPayment.getPaymentStats(filters);

      const totalAmount = stats.reduce(
        (sum, stat) => sum + parseFloat(stat.total_amount),
        0
      );
      const totalPayments = stats.reduce(
        (sum, stat) => sum + parseInt(stat.payment_count),
        0
      );

      return {
        summary: {
          total_amount: totalAmount,
          total_payments: totalPayments,
        },
        by_method: stats,
      };
    } catch (error) {
      throw new Error(`Error fetching payment statistics: ${error.message}`);
    }
  }
}

module.exports = TuitionPaymentService;
