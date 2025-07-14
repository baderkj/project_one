/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('exam_question',function(table){
    table.increments('id');
    table.integer('exam_id').unsigned();
    table.integer('question_id').unsigned();
    table.integer('mark').unsigned().notNullable();

    table.foreign('question_id').references('questions.id').onDelete('cascade');
    table.foreign('exam_id').references('exams.id').onDelete('cascade');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('exam_question');
};
