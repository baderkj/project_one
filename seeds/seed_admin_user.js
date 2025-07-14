const bcrypt = require('bcrypt-nodejs');
const roleService = require('../api/services/roleService');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 1. Clear users if needed (optional)
  await knex('users').del();

  // 2. Get admin role (or create it)
  let [adminRole] = await knex('roles').where({ name: 'admin' });
  if (!adminRole) {
    [adminRole] = await knex('roles').insert({ name: 'admin' }).returning('*');
  }

  // 3. Get all permissions
  const permissions = await knex('permissions').select('id');

  // 4. Link all permissions to admin role
  const existingLinks = await knex('role_permissions').where({
    role_id: adminRole.id,
  });

  if (existingLinks.length < permissions.length) {
    const rolePermissions = permissions.map((p) => ({
      role_id: adminRole.id,
      permission_id: p.id,
    }));

    await knex('role_permissions').insert(rolePermissions);
  }

  // 5. Create admin user
  const hashedPassword = await bcrypt.hashSync('Admin123');
  const existingUser = await knex('users')
    .where({ email: 'admin@system.com' })
    .first();
  if (!existingUser) {
    await knex('users').insert({
      name: 'System Admin',
      email: 'admin@system.com',
      password_hash: hashedPassword,
      role_id: adminRole.id,
      phone: '1234567890',
      birth_date: '1990-01-01',
    });
  }
  const hashedPassword1 = await bcrypt.hashSync('Student123');
  const role_id = await roleService.gerRoleByName('teacher').id;
  const existingUser1 = await knex('users')
    .where({ email: 'student@system.com' })
    .first();
  if (!existingUser1) {
    await knex('users').insert({
      name: 'System Admin',
      email: 'student@system.com',
      password_hash: hashedPassword1,
      phone: '1234567890',
      role_id,
      birth_date: '1990-01-01',
    });
  }
};
