/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('answers', function(table) {
        table.increments('id').primary();
        table.integer('question_id').unsigned().notNullable().checkPositive();
        table.integer('option_id').unsigned().notNullable().checkPositive();
        table.integer('exam_attempt_id').unsigned().notNullable().checkPositive();
        table.integer('mark_awarded').unsigned().nullable().checkPositive();
       
 

        table.foreign('question_id').references('questions.id').onDelete('CASCADE');
        table.foreign('option_id').references('options.id').onDelete('CASCADE');
        table.foreign('exam_attempt_id').references('exam_attempts.id').onDelete('CASCADE');

        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('answers');
};
