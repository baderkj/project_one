const  academic_year= require('../models/academic_year');

module.exports = {
  async createAcademicYear(academicYearData) {
    return await academic_year.create(academicYearData);
  },

  async getAcademicYear(id) {
    return await academic_year.findById(id);
  },

  async getAllAcademicYears() {
    return await academic_year.findAll();
  },

  async updateAcademicYear(id, updates) {
    return await academic_year.update(id, updates);
  },

  async deleteAcademicYear(id) {
    return await academic_year.delete(id);
  },
  // async getStudentsInAcademicYear(id) {
  //   return await academic_year.getStudentsInClass(id);
  // },
 
};