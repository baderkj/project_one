/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('subjects', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('resources').notNullable();
        table.integer('teacher_id');
        table.integer('curriculum_id');

        table.foreign('curriculum_id').references('curriculums.id').onDelete('SET NULL');
        table.foreign('teacher_id').references('teachers.id').onDelete('SET NULL');
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('subjects');
};

