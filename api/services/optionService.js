const Option= require('../models/Option');

module.exports = {
  async createOption(OptionData) {
    return await Option.create(OptionData);
  },

  async getOption(id) {
    return await Option.findById(id);
  },

  async getAllOptions() {
    return await Option.findAll();
  },

  async updateOption(id, updates) {
    return await Option.update(id, updates);
  },

  async deleteOption(id) {
    return await Option.delete(id);
  }
};