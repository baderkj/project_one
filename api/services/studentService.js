const Student = require('../models/Student');
const { getSubject } = require('./subjectService');

module.exports = {
  async createStudent(studentData, trx = null) {
    return await Student.create(studentData, trx);
  },
  
  async getStudent(id) {
    return await Student.findById(id);
  },

  async findByEmail(email,trx=null) {
    return await Student.findByEmail(email,trx);
  },
  async getAllStudents() {
    return await Student.findAll();
  },

  async updateStudent(id, updates) {
    return await Student.update(id, updates);
  },

  async deleteStudent(id) {
    return await Student.delete(id);
  },
  async getSubjects(id) {
    return await Student.getSubjects(id);
  },
  async getClass(id) {
    return await Student.getClass(id);
  },
  async getStudentArchive(id) {
    return await Student.getStudentArchive(id);
  },
  async getStudentSchedule(id) {
    return await Student.getStudentSchedule(id);
  },
};