const teacherService = require('../services/teacherService');
const userService = require('../services/userService');
const { body, validationResult } = require('express-validator');

const bcrypt=require('bcrypt-nodejs');
module.exports = {
  async createTeacher(req, res) {
    try {

      const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }  
    const {name,email,password,role,phone,birth_date,specialization,hire_date,qualification}=req.body;
    const hash= bcrypt.hashSync(password);
    const user=await userService.createUser({
            name:name,
            birth_date:birth_date,
            email:email,
            phone:phone,
            role:role,
            password_hash:hash
          });
          
  
      const Teacher = await teacherService.createTeacher({
        user_id:user[0].id,
        specialization:specialization,
        hire_date:hire_date,
        qualification:qualification,
      });
    
      res.status(201).json(Teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getTeacher(req, res) {
    try {
      const teacher = await teacherService.getTeacher(req.params.id);
      if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllTeachers(req, res) {
    try {
      const teacher = await teacherService.getAllTeachers();
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateTeacher(req, res) {
    try {
      const teacher = await teacherService.updateTeacher(req.params.id, req.body);
      if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
      res.json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteTeacher(req, res) {
    try {
      const result = await teacherService.deleteTeacher(req.params.id);
      if (!result) return res.status(404).json({ error: 'Teacher not found' });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};