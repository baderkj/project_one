const {db} = require('../../config/db');

class Schedule {
  static async create(scheduleData) {
    return await db('schedules').insert(scheduleData).returning('*');
  }

  static async findById(id) {
    return await db('schedules').where({ id }).first();
  }

  static async findAll() {
    return await db('schedules').select('*') ;
  }

  static async update(id, updates) {
    return await db('schedules').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('schedules').where({ id }).del();
  }

 

 
}

module.exports = Schedule;
