const {db} = require('../../config/db');

class Student {
  static async create(studentData, trx = null) {
    const query = db('students');
    if (trx) query.transacting(trx);
    return await query.insert(studentData).returning('*');
  }
  

  static async findById(id) {
    return await db('students').where({ id }).first();
  }

  static async findAll() {
    return await db('students').select('*') ;
  }

  static async update(id, updates) {
    return await db('students').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('students').where({ id }).del();
  }
  static async getClass(id) {
    return await db('students as s')
    .join('classes as c', 's.class_id', 'c.id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('c.*');
  }
  static async getSubjects(id) {
    return await db('students as s')
    .join('subjects as su', 's.curriculum_id', 'su.curriculum_id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('su.*');
  }
}

module.exports = Student;