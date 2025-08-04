/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    console.log('seeding roles and permissions');
    await knex('role_permissions').del();
    await knex('permissions').del();
    await knex('roles').del();

    const [admin] = await knex('roles')
        .insert([{ name: 'admin' }])
        .returning('*');
    const [student] = await knex('roles')
        .insert([{ name: 'student' }])
        .returning('*');
    const [teacher] = await knex('roles')
        .insert([{ name: 'teacher' }])
        .returning('*');

    const permissionsList = [
        // Academic Year
        { name: 'create_academic_year' },
        { name: 'get_all_academic_years' },
        { name: 'get_academic_year' },
        { name: 'update_academic_year' },
        { name: 'delete_academic_year' },

        // Answer
        { name: 'create_answer' },
        { name: 'get_all_answers' },
        { name: 'get_answer' },
        { name: 'update_answer' },
        { name: 'delete_answer' },

        // Archive
        { name: 'create_archive' },
        { name: 'get_all_archives' },
        { name: 'get_archive' },
        { name: 'update_archive' },
        { name: 'delete_archive' },

        // Attendance - Employees
        { name: 'create_employees_attendance' },
        { name: 'get_all_employees_attendance' },
        { name: 'get_employees_attendance' },
        { name: 'update_employees_attendance' },
        { name: 'delete_employees_attendance' },

        // Attendance - Students
        { name: 'create_students_attendance' },
        { name: 'get_all_students_attendance' },
        { name: 'get_students_attendance' },
        { name: 'update_students_attendance' },
        { name: 'delete_students_attendance' },

        // Class
        { name: 'create_calss' },
        { name: 'get_all_classes' },
        { name: 'get_students_in_class' },
        { name: 'get_class' },
        { name: 'update_class' },
        { name: 'delete_class' },

        // Curriculum
        { name: 'create_curriculum' },
        { name: 'get_all_curriculums' },
        { name: 'get_curriculum' },
        { name: 'update_curriculum' },
        { name: 'delete_curriculum' },

        // Day
        { name: 'create_day' },
        { name: 'get_all_days' },
        { name: 'get_day' },
        { name: 'update_day' },
        { name: 'delete_day' },

        // Exam Attempt
        { name: 'create_exam_attempt' },
        { name: 'get_all_exam_attempts' },
        { name: 'get_all_exam_attempt' },
        { name: 'update_exam_attempt' },
        { name: 'delete_exam_attempt' },

        // Exam Question
        { name: 'create_exam_question' },
        { name: 'get_all_exam_questions' },
        { name: 'get_exam_question' },
        { name: 'update_exam_question' },
        { name: 'delete_exam_question' },

        // Exam
        { name: 'create_exam' },
        { name: 'get_all_exam' },
        { name: 'get_all_preexam_of_semester' },
        { name: 'get_all_next_exam' },
        { name: 'get_all_semesters_by_subject_fot_preexams' },
        { name: 'get_exam_questions' },
        { name: 'get_exam' },
        { name: 'update_exam' },
        { name: 'delete_exam' },

        // Option
        { name: 'create_option' },
        { name: 'get_all_options' },
        { name: 'get_option' },
        { name: 'update_option' },
        { name: 'delete_option' },

        // Period
        { name: 'create_period' },
        { name: 'get_all_periods' },
        { name: 'get_period' },
        { name: 'update_period' },
        { name: 'delete_period' },

        // Question
        { name: 'create_question' },
        { name: 'get_all_questions' },
        { name: 'get_all_exam_questions' },
        { name: 'get_question' },
        { name: 'update_question' },
        { name: 'delete_question' },

        // Role
        { name: 'show_all_roles' },
        { name: 'show_role_permissions' },

        // Schedule
        { name: 'create_schedule' },
        { name: 'get_all_schedule' },
        { name: 'get_schedule' },
        { name: 'update_scedule' },
        { name: 'delete_scedule' },

        // Semester
        { name: 'create_semester' },
        { name: 'get_all_semesters' },
        { name: 'get_semester' },
        { name: 'update_semester' },
        { name: 'delete_semester' },

        // Student
        { name: 'get_student_subjects' },
        { name: 'get_student_class' },
        { name: 'get_student_archive' },
        { name: 'get_student' },
        { name: 'update_student' },
        { name: 'delete_student' },
        { name: 'get_student_schedule' },

        // Subject
        { name: 'create_subject' },
        { name: 'get_all_subjects' },
        { name: 'get_subject' },
        { name: 'update_subject' },
        { name: 'delete_subject' },

        // Teacher
        { name: 'get_teachers' },
        { name: 'get_teacher_subjects' },
        { name: 'get_teacher_schedule' },
        { name: 'get_teacher' },
        { name: 'update_teacher' },
        { name: 'delete_teacher' },

        // User
        { name: 'create_user' },
        { name: 'show_users' },
        { name: 'get_employees' },
        { name: 'search_user' },
        { name: 'paginate_user' },
        { name: 'update_user' },
        { name: 'delete_user' },
    ];

    const permissions = await knex('permissions')
        .insert(permissionsList)
        .returning('*');

    const rolePermissions = [
        ...permissions.map((p) => ({ role_id: admin.id, permission_id: p.id })),
    ];

    await knex('role_permissions').insert(rolePermissions);

    const rolePermissions1 = [
        ...permissions.map((p) => ({
            role_id: student.id,
            permission_id: p.id,
        })),
    ];

    await knex('role_permissions').insert(rolePermissions1);
};
