const User = require('../models/User');
const axios = require('axios');
module.exports = {
  async createUser(userData, trx = null) {
    return await User.create(userData, trx);
  },

  async getUser(id) {
    return await User.findById(id);
  },

  async sendMessage(to, body) {

    console.log(process.env.ULTRA_MSG_API_URL);
    try {
      const response = await axios.post(process.env.ULTRA_MSG_API_URL, {
        token: process.env.ULTRA_MSG_TOKEN,
        to: to,
        body: body,
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error sending message:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async getAllUsers() {
    return await User.findAll();
  },

  async updateUser(id, updates) {
    return await User.update(id, updates);
  },

  async deleteUser(id) {
    return await User.delete(id);
  },


  async findUserWithRole(id) {
    return await User.findWithRole(id);
  },


  async search(name) {
    return await User.search(name);
  },
  async  paginate({
    table,
    page = 1,
    pageSize = 10,
    orderBy = 'id',
    orderDirection = 'asc'
  } ) {   
    const totalResult = await User.count({table});
    const total = parseInt(totalResult[0].total, 10);
  
    const data=await User.paginate({table,page,pageSize,orderBy,orderDirection});
    const { password_hash, ...userData } = data;
  
    return {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      userData
    };
  },
  


};

