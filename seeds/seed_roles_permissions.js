/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('role_permissions').del();
  await knex('permissions').del();
  await knex('roles').del();

  const [admin] = await knex('roles')
    .insert([{ name: 'admin' }, { name: 'teacher' }, { name: 'student' }])
    .returning('*');

  const permissionsList = [
    // user
    { name: 'create_user' },
    { name: 'delete_user' },
    { name: 'show_users' },
    { name: 'update_user' },
    // role
    { name: 'create_role' },
    { name: 'show_roles' },
    { name: 'update_role' },
    { name: 'show_role_permissions' },
    // teacher
    { name: 'create_teacher' },
    { name: 'get_teachers' },
    { name: 'get_teacher_subjects' },
    { name: 'get_teacher' },
    { name: 'update_teacher' },
    { name: 'delete_teacher' },
    // subject
    { name: 'create_subject' },
    { name: 'get_all_subjects' },
    { name: 'get_subject' },
    { name: 'update_subject' },
    { name: 'delete_subject' },
    // student
    { name: 'create_student' },
    { name: 'get_all_students' },
    { name: 'get_student_subjects' },
    { name: 'get_student_class' },
    { name: 'get_student_archive' },
    { name: 'get_student' },
    { name: 'update_student' },
    { name: 'delete_student' },
    // schedule
    { name: 'create_schedule' },
    { name: 'get_all_schedule' },
    { name: 'get_schedule_classes' },
    { name: 'get_schedule_subjects' },
    { name: 'get_periods' },
    { name: 'get_days' },
    { name: 'get_schedule' },
    { name: 'update_scedule' },
    { name: 'delete_scedule' },
    // period
    { name: 'create_period' },
    { name: 'get_all_periods' },
    { name: 'get_period' },
    { name: 'update_period' },
    { name: 'delete_period' },
    // day
    { name: 'create_day' },
    { name: 'get_all_days' },
    { name: 'get_day' },
    { name: 'update_day' },
    { name: 'delete_day' },
    // curriculum
    { name: 'create_curriculum' },
    { name: 'get_all_curriculums' },
    { name: 'get_curriculum' },
    { name: 'update_curriculum' },
    { name: 'delete_curriculum' },
    // class
    { name: 'create_calss' },
    { name: 'get_all_classes' },
    { name: 'get_students_in_class' },
    { name: 'get_class' },
    { name: 'update_class' },
    { name: 'delete_class' },
    // behavior
    { name: 'get_all_behaviors' },
    { name: 'get_behavior' },
    { name: 'create_behavior' },
    { name: 'update_behavior' },
    { name: 'delete_behavior' },
    // archive
    { name: 'create_archive' },
    { name: 'get_all_archives' },
    { name: 'get_archive' },
    { name: 'update_archive' },
    { name: 'delete_archive' },
    // academic_year
    { name: 'create_academic_year' },
    { name: 'get_all_academic_years' },
    { name: 'get_academic_year' },
    { name: 'update_academic_year' },
    { name: 'delete_academic_year' },
  ];

  const permissions = await knex('permissions')
    .insert(permissionsList)
    .returning('*');

  const rolePermissions = [
    ...permissions.map((p) => ({ role_id: admin.id, permission_id: p.id })),
  ];

  await knex('role_permissions').insert(rolePermissions);
};
