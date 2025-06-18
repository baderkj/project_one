/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('schedules', function (table) {
    table.increments('id').primary();
    table.integer('class_id').unsigned();
    table.integer('subject_id').unsigned();
    table.integer('day_id');
    table.integer('period_id');

    table.foreign('class_id').references('classes.id').onDelete('RESTRICT');
    table.foreign('subject_id').references('subjects.id').onDelete('RESTRICT');
    table.foreign('day_id').references('days.id').onDelete('CASCADE');
    table.foreign('periods_id').references('periods.id').onDelete('CASCADE');
    table.timestamps(true, true); // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('schedules');
};
