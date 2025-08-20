const { db } = require('../../config/db');

class Class {
    static async create(classData) {
        // Map frontend field names to database field names
        const dbData = {
            class_name: classData.name,
            floor_number: classData.floor,
            level_grade: classData.grade,
        };

        return await db('classes')
            .insert(dbData)
            .returning([
                'id',
                'class_name as name',
                'floor_number as floor',
                'level_grade as grade',
            ]);
    }

    static async findById(id) {
        return await db('classes')
            .where({ id })
            .select(
                'id',
                'class_name as name',
                'floor_number as floor',
                'level_grade as grade'
            )
            .first();
    }

    static async findAll() {
        return await db('classes').select(
            'id',
            'class_name as name',
            'floor_number as floor',
            'level_grade as grade'
        );
    }

    static async getClassesGroupedByGrade() {
        const classes = await db('classes').select('*');

        const studentCounts = new Map();

        const classStudentCounts = await db('students')
            .select('class_id', db.raw('COUNT(*) as student_count'))
            .groupBy('class_id');

        classStudentCounts.forEach((row) => {
            studentCounts.set(row.class_id, row.student_count);
        });

        const grouped = classes.reduce((acc, classItem) => {
            const gradeKey = classItem.level_grade || 'Ungrouped';

            if (!acc[gradeKey]) {
                acc[gradeKey] = {
                    grade_level: gradeKey,
                    classes: [],
                };
            }

            acc[gradeKey].classes.push({
                id: classItem.id,
                class_name: classItem.class_name,
                floor_number: classItem.floor_number,
                capacity: studentCounts.get(classItem.id) || 0,
            });

            return acc;
        }, {});

        return Object.values(grouped);
    }

    static async update(id, updates) {
        // Map frontend field names to database field names
        const dbUpdates = {
            class_name: updates.name,
            floor_number: updates.floor,
            level_grade: updates.grade,
        };

        return await db('classes')
            .where({ id })
            .update(dbUpdates)
            .returning([
                'id',
                'class_name as name',
                'floor_number as floor',
                'level_grade as grade',
            ]);
    }

    static async delete(id) {
        return await db('classes').where({ id }).del();
    }

    static async getStudentsInClass(id) {
        return await db('classes as c')
            .join('students as s', 's.class_id', 'c.id')
            .where('c.id', id) // Changed from where({id:id}) to be more explicit
            .select('s.*');
    }

    static async getClassSchedule(id) {
        const scheduleEntries = await db('classes as c')
            .join('schedules as sc', 'sc.class_id', 'c.id')
            .join('days as d', 'd.id', 'sc.day_id')
            .join('periods as p', 'p.id', 'sc.period_id')
            .join('subjects as su', 'su.id', 'sc.subject_id')
            .where('c.id', id) // Changed from where({id:id}) to be more explicit
            .select(
                'p.id as period_id',
                'p.start_time',
                'p.end_time',
                'd.id as day_id',
                'd.name as day_name',
                'su.name as subject_name'
            )
            .orderBy('d.id', 'asc') // Ensure days are ordered
            .orderBy('p.start_time', 'asc');

        // Group by day
        const scheduleByDay = {};
        scheduleEntries.forEach((entry) => {
            if (!scheduleByDay[entry.day_name]) {
                scheduleByDay[entry.day_name] = {
                    day_id: entry.day_id,
                    day_name: entry.day_name,
                    subjects: [],
                };
            }

            scheduleByDay[entry.day_name].subjects.push({
                period_id: entry.id,
                start_time: entry.start_time,
                end_time: entry.end_time,
                subject_name: entry.subject_name,
            });
        });

        // Convert to array format if preferred
        return Object.values(scheduleByDay);
    }

    static async getClassSubjectsWithTeachers(classId) {
        const cls = await db('classes').where({ id: classId }).first();
        if (!cls) return null;

        const subjects = await db('subjects as s')
            .join('curriculums as cu', 'cu.id', 's.curriculum_id')
            .where('cu.level_grade', cls.level_grade)
            .select('s.id as sub_id', 's.name as sub_name');

        const subjectIds = subjects.map((s) => s.sub_id);
        const teacherRows = subjectIds.length
            ? await db('teachers_subjects as ts')
                  .join('teachers as t', 't.id', 'ts.teacher_id')
                  .join('users as u', 'u.id', 't.user_id')
                  .whereIn('ts.subject_id', subjectIds)
                  .select(
                      'ts.subject_id as sub_id',
                      't.id as teacher_id',
                      'u.name as teacher_name'
                  )
            : [];

        const map = new Map();
        subjects.forEach((s) => {
            map.set(s.sub_id, {
                sub_id: s.sub_id,
                sub_name: s.sub_name,
                teachers: [],
            });
        });
        teacherRows.forEach((r) => {
            const entry = map.get(r.sub_id);
            if (entry) {
                entry.teachers.push({
                    teacher_id: r.teacher_id,
                    teacher_name: r.teacher_name,
                });
            }
        });

        return Array.from(map.values());
    }
}

module.exports = Class;
