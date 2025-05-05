const User = require('../models/User');

module.exports = {
  async createUser(userData) {
    return await User.create(userData);
  },

  async getUser(id) {
    return await User.findById(id);
  },

  async getAllUsers() {
    return await User.findAll();
  },

  async updateUser(id, updates) {
    return await User.update(id, updates);
  },

  async deleteUser(id) {
    return await User.delete(id);
  }
};