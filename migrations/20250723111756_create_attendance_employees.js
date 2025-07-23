/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('attendance_employees',function(table){
        table.increments('id');
        table.integer('user_id').unsigned().notNullable();
        table.integer('created_by').unsigned().notNullable();
        table.date('date').unsigned().notNullable();
        table.enum('status',["present","absent","late"]).notNullable();  
        
        
        
        table.foreign('user_id').references('users.id').onDelete('cascade');
        table.foreign('created_by').references('users.id').onDelete('cascade');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('attendance_employees');
};
