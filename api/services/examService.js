const Exam= require('../models/Exam');

module.exports = {
  async createExam(ExamData) {
    return await Exam.create(ExamData);
  },

  async getExam(id) {
    return await Exam.findById(id);
  },

  async getAllExams() {
    return await Exam.findAll();
  },

  async updateExam(id, updates) {
    return await Exam.update(id, updates);
  },

  async deleteExam(id) {
    return await Exam.delete(id);
  },

  async getExamQuestion(id) {
    return await Exam.getExamQuestion(id);
  }
};