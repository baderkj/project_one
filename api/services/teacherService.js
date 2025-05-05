const Teacher = require('../models/Teacher');

module.exports = {
  async createTeacher(teacherData) {
    return await Teacher.create(teacherData);
  },

  async getTeacher(id) {
    return await Teacher.findById(id);
  },

  async getAllTeachers() {
    return await Teacher.findAll();
  },

  async updateTeacher(id, updates) {
    return await Teacher.update(id, updates);
  },

  async deleteTeacher(id) {
    return await Teacher.delete(id);
  }
};