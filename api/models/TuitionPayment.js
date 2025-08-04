const { db } = require('../../config/db');

class TuitionPayment {
  static get tableName() {
    return 'tuition_payments';
  }

  static async findAll(filters = {}) {
    let query = db(this.tableName)
      .select(
        'tuition_payments.*',
        'students.user_id as student_user_id',
        'student_users.name as student_name',
        'verifier_users.name as verified_by_name'
      )
      .leftJoin('students', 'tuition_payments.student_id', 'students.id')
      .leftJoin(
        'users as student_users',
        'students.user_id',
        'student_users.id'
      )
      .leftJoin(
        'users as verifier_users',
        'tuition_payments.verified_by',
        'verifier_users.id'
      );

    if (filters.student_id) {
      query = query.where('tuition_payments.student_id', filters.student_id);
    }

    if (filters.payment_method) {
      query = query.where(
        'tuition_payments.payment_method',
        filters.payment_method
      );
    }

    if (filters.date_from) {
      query = query.where(
        'tuition_payments.payment_date',
        '>=',
        filters.date_from
      );
    }

    if (filters.date_to) {
      query = query.where(
        'tuition_payments.payment_date',
        '<=',
        filters.date_to
      );
    }

    return await query.orderBy('tuition_payments.payment_date', 'desc');
  }

  static async findById(id) {
    return await db(this.tableName)
      .select(
        'tuition_payments.*',
        'students.user_id as student_user_id',
        'student_users.name as student_name',
        'verifier_users.name as verified_by_name'
      )
      .leftJoin('students', 'tuition_payments.student_id', 'students.id')
      .leftJoin(
        'users as student_users',
        'students.user_id',
        'student_users.id'
      )
      .leftJoin(
        'users as verifier_users',
        'tuition_payments.verified_by',
        'verifier_users.id'
      )
      .where('tuition_payments.id', id)
      .first();
  }

  static async create(paymentData) {
    const [id] = await db(this.tableName).insert(paymentData).returning('id');
    return await this.findById(id);
  }

  static async update(id, paymentData) {
    await db(this.tableName).where('id', id).update(paymentData);
    return await this.findById(id);
  }

  static async delete(id) {
    return await db(this.tableName).where('id', id).del();
  }

  static async findByStudentId(studentId) {
    return await db(this.tableName)
      .where('student_id', studentId)
      .orderBy('payment_date', 'desc');
  }

  static async getTotalAmountByStudent(studentId) {
    const result = await db(this.tableName)
      .where('student_id', studentId)
      .sum('amount as total_amount')
      .first();

    return result.total_amount || 0;
  }

  static async getPaymentStats(filters = {}) {
    let query = db(this.tableName);

    if (filters.date_from) {
      query = query.where('payment_date', '>=', filters.date_from);
    }

    if (filters.date_to) {
      query = query.where('payment_date', '<=', filters.date_to);
    }

    return await query
      .select('payment_method')
      .sum('amount as total_amount')
      .count('id as payment_count')
      .groupBy('payment_method');
  }
}

module.exports = TuitionPayment;
