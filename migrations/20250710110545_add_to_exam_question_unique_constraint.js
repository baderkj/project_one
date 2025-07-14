/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('exam_question', function(table) {
        // Add composite unique constraint
        table.unique(['exam_id', 'question_id'], 'exams_questions_unique');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('exam_question', function(table) {
        // Remove the constraint in the down migration
        table.dropUnique(['exam_id', 'question_id'], 'exams_questions_unique');
    });
};