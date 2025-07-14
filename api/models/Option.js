const {db} = require('../../config/db');

class Option {
  static async create(OptionData) {
    return await db('options').insert(OptionData).returning('*');
  }

  static async findById(id) {
    return await db('options').where({ id }).first();
  }

  static async findAll() {
    return await db('options').select('*') ;
  }

  static async update(id, updates) {
    return await db('options').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('options').where({ id }).del();
  }
}

module.exports = Option;
