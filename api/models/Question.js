const {db} = require('../../config/db');

class Question {
  static async create(questionData) { 
    return await db('questions').insert(questionData).returning('*');
  }

  static async findById(id) {
    return await db('questions').where({ id }).first();
  }

  static async findAll() {
    return await db('questions').select('*') ;
  }

  static async update(id, updates) {
    return await db('questions').where({ id }).update(updates).returning('*');
  }
 
  static async delete(id) {
    return await db('questions').where({ id }).del();
  }
}

module.exports = Question;
