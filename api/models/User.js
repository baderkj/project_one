const { db } = require('../../config/db');

class User {
  static async create(userData, trx = null) {
    const query = db('users');
    if (trx) query.transacting(trx);
    return await query.insert(userData).returning('*');
  }

  static async findById(id) {
    return await db('users').where({ id }).first();
  }

  static async findAll() {
    return await db('users').select('*');
  }

  static async update(id, updates) {
    return await db('users').where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return await db('users').where({ id }).del();
  }

<<<<<<< HEAD
  static async findWithRole(id) {
    return db('users')
      .join('roles', 'users.role_id', 'roles.id')
      .select('users.*', 'roles.name as role')
      .where('users.id', id)
      .first();
  }
=======
  static async search(name) {
    return await db('users').where('name', 'like', `%${name}%`).select('*');
  }

  static async paginate({
    table,
    page = 1,
    pageSize = 10,
    orderBy = 'id',
    orderDirection = 'asc'
  }) {

    const columns = await db(table).columnInfo();
    const filteredColumns= Object.keys(columns).filter(col => col !== 'password_hash');
    return await db(table)
    .select(filteredColumns)
    .orderBy(orderBy, orderDirection)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
    
  }

  static async count({
    table 
  }) {
    return await db(table)
    .count('* as total')
   
  }


>>>>>>> ed7006f460fc443032659759ef1532a35edcf456
}

module.exports = User;
