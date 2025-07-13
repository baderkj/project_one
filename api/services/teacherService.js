const Teacher = require('../models/Teacher');


module.exports = {
  async createTeacher(teacherData,trx=null) {
    return await Teacher.create(teacherData,trx);
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
  },
  async getSubjects(id) {
    return await Teacher.getSubjects(id);
  },
  async getTeacherSchedule(id) {
    return await Teacher.getTeacherSchedule(id);
  }
};