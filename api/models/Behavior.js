const { db } = require('../../config/db');

class Behavior {
  static async getAll() {
    return await db('behaviors').select('*');
  }

  static async getById(id) {
    return await db('behaviors').where({ id: id }).first();
  }

  static async create(data) {
    const result = await db('behaviors').insert(data).returning('*');
    return result[0];
  }

  static async update(id, data) {
    const result = await db('behaviors')
      .where({ id: id })
      .update(data)
      .returning('*');
    return result[0]; // return updated row
  }

  static async delete(id) {
    return await db('behaviors').where({ id: id }).del();
  }
}

module.exports = Behavior;
