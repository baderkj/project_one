const {db} = require('../../config/db');

class Student {
  static async create(studentData, trx = null) {
    const query = db('students');
    if (trx) query.transacting(trx);
    return await query.insert(studentData).returning('*');
  }
  

  static async findById(id) {
    return await db('students').where({ id }).first();
  }

  static async findAll() {
    return await db('students').select('*') ;
  }

  static async update(id, updates) {
    return await db('students').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('students').where({ id }).del();
  }
  static async getClass(id) {
    return await db('students as s')
    .join('classes as c', 's.class_id', 'c.id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('c.*');
  }
  static async getSubjects(id) {
    return await db('students as s')
    .join('subjects as su', 's.curriculum_id', 'su.curriculum_id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('su.*');
  }
  static async getStudentArchive(id) {
    return await db('archives as c')
    .join('students as s', 's.id', 'a.student_id')
    .where('s.id', id)  // Changed from where({id:id}) to be more explicit
    .select('s.*','a.*');
  }
  static async getStudentSchedule(id) {
    return await db('schedules as sc')
    .join('students as st', 'st.class_id', 'sc.class_id')
    .join('days as d', 'd.id', 'sc.day_id')
    .join('periods as p', 'p.id', 'sc.period_id')
    .join('subjects as su', 'su.id', 'sc.subject_id')
    .where('st.id', id)  // Changed from where({id:id}) to be more explicit
    .select('p.*','d.*','su.name as subject_name');
  }
}

module.exports = Student;