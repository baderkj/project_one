/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('questions', function(table) {
        table.increments('id').primary();
        table.integer('exam_id').unsigned().checkPositive();
        table.text('question_text').notNullable();
        table.integer('mark').unsigned().notNullable().checkPositive();
        table.enum('type',['mcq','true_false']);
        
 

        table.foreign('exam_id').references('exams.id').onDelete('CASCADE');
      
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('questions');
};
