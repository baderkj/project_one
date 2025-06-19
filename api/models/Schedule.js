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

  static async getClasses(id) {
    return await db('schedules as s')
    .join('classes as c', 's.class_id', 'c.id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('c.*');
  }

  static async getSubjects(id) {
    return await db('schedules as s')
    .join('subjects as su', 's.subject_id', 'su.id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('su.*');
  }

  static async getPeriods(id) {
    return await db('schedules as s')
    .join('periods as p', 's.period_id', 'p.id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('p.*');
  }

  static async getDays(id) {
    return await db('schedules as s')
    .join('days as d', 's.day_id', 'd.id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('d.*');
  }
}

module.exports = Schedule;
