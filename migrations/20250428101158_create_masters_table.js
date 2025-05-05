/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('masters', function(table) {
        table.increments('id').primary();
        table.string('password').notNullable();
        table.string('email').unique().notNullable();
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('masters');
};
