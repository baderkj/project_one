/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('questions',function(table){
    table.dropColumn('exam_id');
    table.dropColumn('mark');
    table.integer('subject_id').unsigned();

    table.foreign('subject_id').references('subjects.id').onDelete('cascade');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('questions',function(table){
        table.dropColumn('subject_id');
        // table.integer('exam_id').unsigned();
        
        // table.foreign('exam_id').references('exams.id').onDelete('cascade');
      });
};
