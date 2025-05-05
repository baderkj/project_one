const {db} = require('../../config/db');

class User {
  static async create(teacherData) {
    return await db('teachers').insert(teacherData).returning('*');
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
}

module.exports = User;