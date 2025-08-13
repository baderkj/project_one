const {db} = require('../../config/db');

class Class {
  static async create(classData) {
    return await db('classes').insert(classData).returning('*');
  }

  static async findById(id) {
    return await db('classes').where({ id }).first();
  }

  static async findAll() {
    return await db('classes').select('*') ;
  }

  static async getClassesGroupedByGrade() {
    
    const classes = await db('classes').select('*');
    
    const studentCounts = new Map();
    
    const classStudentCounts = await db('students')
        .select('class_id', db.raw('COUNT(*) as student_count'))
        .groupBy('class_id');
    
    classStudentCounts.forEach(row => {
        studentCounts.set(row.class_id, row.student_count);
    });
    
    const grouped = classes.reduce((acc, classItem) => {
        const gradeKey = classItem.level_grade || 'Ungrouped';
        
        if (!acc[gradeKey]) {
            acc[gradeKey] = {
                grade_level: gradeKey,
                classes: []
            };
        }
        
        acc[gradeKey].classes.push({
            id: classItem.id,
            class_name: classItem.class_name,
            floor_number: classItem.floor_number,
            capacity: studentCounts.get(classItem.id) || 0
        });
        
        return acc;
    }, {});
    
    return Object.values(grouped);
}

  static async update(id, updates) {
    return await db('classes').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('classes').where({ id }).del();
  }

  static async getStudentsInClass(id) {
    return await db('classes as c')
    .join('students as s', 's.class_id', 'c.id')
    .where('c.id', id)  // Changed from where({id:id}) to be more explicit
    .select('s.*');
  }

  static async getClassSchedule(id) {
     const  scheduleEntries =await db('classes as c')
    .join('schedules as sc', 'sc.class_id', 'c.id')
    .join('days as d', 'd.id', 'sc.day_id')
    .join('periods as p', 'p.id', 'sc.period_id')
    .join('subjects as su', 'su.id', 'sc.subject_id')
    .where('c.id', id)  // Changed from where({id:id}) to be more explicit
    .select('p.id as period_id', 'p.start_time', 'p.end_time', 'd.id as day_id', 'd.name as day_name', 'su.name as subject_name')
    .orderBy('d.id', 'asc') // Ensure days are ordered
    .orderBy('p.start_time', 'asc');

    
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

module.exports = Class;