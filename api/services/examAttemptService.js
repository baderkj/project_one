const ExamAttempt= require('../models/exam_attempt');

module.exports = {
  async createExamAttempt(ExamAttemptData,trx=null) {
    return await ExamAttempt.create(ExamAttemptData,trx);
  },

  async getExamAttempt(id) {
    return await ExamAttempt.findById(id);
  },

  async getAllExamAttempts() {
    return await ExamAttempt.findAll();
  },

  async updateExamAttempt(id, updates) {
    return await ExamAttempt.update(id, updates);
  },

  async deleteExamAttempt(id) {
    return await ExamAttempt.delete(id);
  }
};