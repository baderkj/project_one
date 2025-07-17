const { db } = require('../../config/db');

class Role {
  static async findAll() {
    return await db('roles').select('*');
  }

  static async create({ name }) {
    return await db('roles').insert({ name }).returning('*');
  }

  static async getRoleByName(name) {
    return await db('roles').where({ name }).select('*');
  }

  static async getRoleById({ id }) {
    return await db('roles').where({ id }).select('*');
  }

  static async delete(id) {
    return await db('roles').where({ id }).del();
  }
}

module.exports = Role;
