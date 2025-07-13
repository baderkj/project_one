const Behavior = require('../models/Behavior');

module.exports = {
  async getAllBehaviors() {
    return await Behavior.getAll();
  },

  async getBehaviorById(id) {
    return await Behavior.getById(id);
  },

  async createBehavior(data) {
    return await Behavior.create(data);
  },

  async updateBehavior(id, data) {
    return await Behavior.update(id, data);
  },

  async deleteBehavior(id) {
    return await Behavior.delete(id);
  },
};
