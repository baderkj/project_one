/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('archives', function(table) {
        table.integer('student_id').unsigned();
        table.integer('academic_year_id').unsigned();
        table.integer('remaining_tuition').unsigned();

        table.foreign('student_id').references('students.id').onDelete('SET NULL');
        table.foreign('academic_year_id').references('academic_years.id').onDelete('SET NULL');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('archives');
};
