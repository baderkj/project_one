const { db } = require('../../config/db');

class User {
  static async create(userData, trx = null) {
    const query = db('users');
    if (trx) query.transacting(trx);
    return await query.insert(userData).returning('*');
  }

  static async findById(id) {
    return await db('users').where({ id }).first();
  }

  static async findAll() {
    return await db('users').select('*');
  }

  static async update(id, updates) {
    return await db('users').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('users').where({ id }).del();
  }

  static async findWithRole(id) {
    return db('users')
      .join('roles', 'users.role_id', 'roles.id')
      .select('users.*', 'roles.name as role')
      .where('users.id', id)
      .first();
  }
}

module.exports = User;
