const {db} = require('../../config/db');

class Teacher {

  static async create(teacherData, trx = null) {
    const query = db('teachers');
    if (trx) query.transacting(trx);
    return await query.insert(teacherData).returning('*');
  }
  
  static async findById(id) {
    return await db('teachers').where({ id }).first();
  }

  static async findByUserId(user_id) {
    return await db('teachers').where({ user_id }).first();
  }

  static async findAll() {
    return await db('teachers').select('*') ;
  }
 
  static async update(id, updates) {
    return await db('teachers').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('teachers').where({ id }).del();
  }
  static async getSubjects(id) {
    return await db('subjects as su')
    .join('teachers_subjects as ts','ts.subject_id','su.id')
    .where('ts.teacher_id', id) 
    .select('su.*');
  }
  static async getTeacherSchedule(id) {
    const scheduleEntries = await db('schedules as sc')
    
    .join('days as d', 'd.id', 'sc.day_id')
    .join('periods as p', 'p.id', 'sc.period_id')
    .join('subjects as su', 'su.id', 'sc.subject_id')
    .where('sc.teacher_id', id) 
    .select('p.*','d.*','su.name as subject_name');
    const scheduleByDay = {};
    scheduleEntries.forEach(entry => {
      if (!scheduleByDay[entry.name]) {
        scheduleByDay[entry.name] = {
          day_id: entry.day_id,
          name: entry.name,
          subjects: []
        };
      }
      
      scheduleByDay[entry.name].subjects.push({
        
        start_time: entry.start_time,
        end_time: entry.end_time,
        subject_name: entry.subject_name
      });
    });
    
    // Convert to array format if preferred
    return Object.values(scheduleByDay);
    
  }

  static async getQuestions(id) {
    const rows = await db('teachers as t')
    .join('teachers_subjects as ts', 'ts.teacher_id', 't.id')
    .join('subjects as s', 's.id', 'ts.subject_id') 
    .join('questions as q', 'q.subject_id', 'ts.subject_id')
    .join('options as o', 'o.question_id', 'q.id')
    .where('ts.teacher_id', id)
    .select(
        's.id as subject_id',
        's.name as subject_name',
        'q.type',
        'o.id as option_id',
        'o.text as option_text',
        'o.is_correct',
        'q.id as question_id',
        'q.question_text'
    )
    .orderBy('s.id', 'q.id'); 

          
    const subjectsMap = rows.reduce((acc, row) => {
      const subjectId = row.subject_id;
      
      if (!acc[subjectId]) {
          acc[subjectId] = {
              subject_id: row.subject_id,
              subject_name: row.subject_name,
              questions: {}
          };
      }
      

      const questionId = row.question_id;
      if (!acc[subjectId].questions[questionId]) {
          acc[subjectId].questions[questionId] = {
              question_id: row.question_id,
              question_text: row.question_text,
              type: row.type,
              options: []
          };
      }
    
      acc[subjectId].questions[questionId].options.push({
          option_id: row.option_id,
          option_text: row.option_text,
          is_correct: row.is_correct
      });
      
      return acc;
  }, {});
  
 
  const result = Object.values(subjectsMap).map(subject => ({
      ...subject,
      questions: Object.values(subject.questions)
  }));
  
  return result;

  }
}

module.exports = Teacher;