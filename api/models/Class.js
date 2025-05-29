const {db} = require('../../config/db');

class Class {
  static async create(classData) {
    return await db('classes').insert(classData).returning('*');
  }

  static async findById(id) {
    return await db('classes').where({ id }).first();
  }

  static async findAll() {
    return await db('classes').select('*') ;
  }

  static async update(id, updates) {
    return await db('classes').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('classes').where({ id }).del();
  }

  static async getStudentsInClass(id) {
    return await db('classes as c')
    .join('students as s', 's.class_id', 'c.id')
    .where('c.id', id)  // Changed from where({id:id}) to be more explicit
    .select('s.*');
  }
}

module.exports = Class;