/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('options', function(table) {
        table.increments('id').primary();
        table.integer('question_id').unsigned().checkPositive();
        table.text('text').notNullable();
        table.boolean('is_correct').notNullable();
 

        table.foreign('question_id').references('questions.id').onDelete('CASCADE');
      
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('options');
};
