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

  // static async findByEmail(email) {
  //  const user= await db('users').where({email}).first();
  //   return await db('students').where({ user_id:user.id }).first();
  // }
  async findByEmail(email, trx = null) {
    const user= await db('users').where({email}).first();
    const query =  db('students').where({ user_id:user.id }).first();
    if (trx) query.transacting(trx);
    return query;
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

    const scheduleEntries = await db('schedules as sc')
      .join('students as st', 'st.class_id', 'sc.class_id')
      .join('days as d', 'd.id', 'sc.day_id')
      .join('periods as p', 'p.id', 'sc.period_id')
      .join('subjects as su', 'su.id', 'sc.subject_id')
      .where('st.id', id)
      .select('p.id as period_id', 'p.start_time', 'p.end_time', 'd.id as day_id', 'd.name as day_name', 'su.name as subject_name')
      .orderBy('d.id', 'asc') // Ensure days are ordered
      .orderBy('p.id', 'asc'); 
      
    

    // Group by day
    const scheduleByDay = {};
    scheduleEntries.forEach(entry => {
      if (!scheduleByDay[entry.day_name]) {
        scheduleByDay[entry.day_name] = {
          day_id: entry.day_id,
          day_name: entry.day_name,
          subjects: []
        };
      }
      
      scheduleByDay[entry.day_name].subjects.push({
        period_id: entry.id,
        start_time: entry.start_time,
        end_time: entry.end_time,
        subject_name: entry.subject_name
      });
    });
    
    // Convert to array format if preferred
    return Object.values(scheduleByDay);
  }
}

module.exports = Student;