/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('exam_attempts', function(table) {
        table.increments('id').primary();
        table.integer('exam_id').unsigned().checkPositive();
        table.integer('student_id').unsigned().checkPositive();
        table.integer('score').unsigned().nullable().checkPositive();
       
 

        table.foreign('exam_id').references('exams.id').onDelete('CASCADE');
        table.foreign('student_id').references('students.id').onDelete('CASCADE');
        
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('exam_attempts')
};
