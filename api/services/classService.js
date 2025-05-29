const  Class= require('../models/Class');

module.exports = {
  async createClass(classData) {
    return await Class.create(classData);
  },

  async getClass(id) {
    return await Class.findById(id);
  },

  async getAllClasses() {
    return await Class.findAll();
  },

  async updateClass(id, updates) {
    return await Class.update(id, updates);
  },

  async deleteClass(id) {
    return await Class.delete(id);
  },
  async getStudentsInClass(id) {
    return await Class.getStudentsInClass(id);
  },
 
};