const {db} = require('../../config/db');

class Subject {
  static async create(SubjectData) {
    return await db('subjects').insert(SubjectData).returning('*');
  }

  static async findById(id) {
    return await db('subjects').where({ id }).first();
  }

  static async findAll() {
    return await db('subjects').select('*') ;
  }

  static async update(id, updates) {
    return await db('subjects').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('subjects').where({ id }).del();
  }
}

module.exports = Subject;