const {db} = require('../../config/db');

class Archive {
  static async create(ArchiveData) {
    return await db('archives').insert(ArchiveData).returning('*');
  }

  static async findById(id) {
    return await db('archives').where({ id }).first();
  }

  static async findAll() {
    return await db('archives').select('*') ;
  }

  static async update(id, updates) {
    return await db('archives').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('archives').where({ id }).del();
  }

  static async getStudentArchive(id) {
    return await db('archives as c')
    .join('students as s', 's.id', 'a.student_id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('s.*','a.*');
  }
}

module.exports = Archive;