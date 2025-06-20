/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('archives', function(table) {
        // Add composite unique constraint
        table.increments('id').primary();
        table.integer('remaining_tuition').unsigned().notNullable().defaultTo(0).alter();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('archives', function(table) {
        // Add composite unique constraint
        table.dropColumn('id');
    })
};
