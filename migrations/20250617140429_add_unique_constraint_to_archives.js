/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('archives', function(table) {
        // Add composite unique constraint
        table.unique(['student_id', 'academic_year_id'], 'archives_student_year_unique');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('archives', function(table) {
        // Remove the constraint in the down migration
        table.dropUnique(['student_id', 'academic_year_id'], 'archives_student_year_unique');
    });
};