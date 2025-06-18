const Schedule= require('../models/Schedule');

module.exports = {
  async createSchedule(ScheduleData) {
    return await Schedule.create(ScheduleData);
  },

  async getSchedule(id) {
    return await Schedule.findById(id);
  },

  async getAllSchedules() {
    return await Schedule.findAll();
  },

  async updateSchedule(id, updates) {
    return await Schedule.update(id, updates);
  },

  async deleteSchedule(id) {
    return await Schedule.delete(id);
  },

  async getPeriods(id) {
    return await Schedule.getPeriods(id);
  },

  async getDays(id) {
    return await Schedule.getDays(id);
  }
};