/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.table('users', (table) => {
    table.dropColumn('role'); // Drop the enum column
  });

  await knex.schema.table('users', (table) => {
    table
      .integer('role_id')
      .unsigned()
      .references('id')
      .inTable('roles')
      .onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.table('users', (table) => {
    table.dropColumn('role_id');
  });

  await knex.schema.table('users', (table) => {
    table
      .enum('role', ['student', 'teacher', 'admin', 'data_entry'])
      .notNullable();
  });
};
