const {db} = require('../../config/db');

class ExamAttempt {
  static async create(ExamAttemptData,trx=null) {
    const query = db('exam_attempts').insert(ExamAttemptData).returning('*');
    if (trx) query.transacting(trx);
    return query;
  }

  static async findById(id) {
    return await db('exam_attempts').where({ id }).first();
  }

  static async findAll() {
    return await db('exam_attempts').select('*') ;
  }

  static async update(id, updates) {
    return await db('exam_attempts').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('exam_attempts').where({ id }).del();
  }
}

module.exports = ExamAttempt;
