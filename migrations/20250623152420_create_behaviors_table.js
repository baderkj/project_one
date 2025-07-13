/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('behaviors', function (table) {
    table.increments('id').primary();

    table.integer('student_id').unsigned().notNullable();
    table.text('description').notNullable();
    table.date('date').notNullable();
    table.enu('type', ['bad', 'good']).notNullable();

    // Foreign key constraint
    table.foreign('student_id').references('students.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
