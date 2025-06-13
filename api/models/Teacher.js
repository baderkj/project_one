const {db} = require('../../config/db');

class Teacher {

  static async create(teacherData, trx = null) {
    const query = db('teachers');
    if (trx) query.transacting(trx);
    return await query.insert(teacherData).returning('*');
  }
  
  static async findById(id) {
    return await db('teachers').where({ id }).first();
  }

  static async findAll() {
    return await db('teachers').select('*') ;
  }

  static async update(id, updates) {
    return await db('teachers').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('teachers').where({ id }).del();
  }
  static async getSubjects(id) {
    return await db('subjects as su')
    .where('su.teacher_id', id)  // Changed from where({id:id}) to be more explicit
    .select('su.*');
  }
}

module.exports = Teacher;