/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exams', function(table) {
        table.increments('id').primary();
        table.integer('subject_id').unsigned().checkPositive();
        table.string('title',100).notNullable();
        table.text('description').nullable();
        table.integer('time_limit').unsigned().notNullable().checkPositive();
        table.integer('total_mark').unsigned().notNullable().checkPositive();
        table.integer('passing_mark').unsigned().nullable().checkPositive();
        table.dateTime('start_datetime').notNullable();
        table.dateTime('end_datetime').notNullable();

        table.check('start_datetime > CURRENT_TIMESTAMP', [], 'future_end_date');
        table.check('end_datetime > CURRENT_TIMESTAMP', [], 'future_start_date');

        table.foreign('subject_id').references('subjects.id').onDelete('CASCADE');
      
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('exams');
};
