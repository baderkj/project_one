const studentService = require('../services/studentService');
const userService = require('../services/userService');
const {  validationResult } = require('express-validator');

const bcrypt=require('bcrypt-nodejs');
module.exports = {
  async createStudent(req, res) {
    const { db } = require('../../config/db');
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }  
      
      const { name, email, password, phone, birth_date, class_id, curriculum_id, grade_level } = req.body;
      const hash = bcrypt.hashSync(password);
      
      // Using transaction
      const result = await db.transaction(async (trx) => {
        // Create user within transaction
        const user = await userService.createUser({
          name: name,
          birth_date: birth_date,
          email: email,
          phone: phone,
          password_hash: hash
        }, trx);
        
        // Create student within the same transaction
        const student = await studentService.createStudent({
          user_id: user[0].id,
          class_id: class_id,
          curriculum_id: curriculum_id,
          grade_level: grade_level,
        }, trx);
        
        return student;
      });
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Transaction error:', error);
      res.status(400).json({ 
        error: error.message,
        msg: 'Failed to create student. All changes rolled back.'
      });
    }
  },

  async getStudent(req, res) {
    try {
      const student = await studentService.getStudent(req.params.id);
      if (!student) return res.status(404).json({ error: 'Student not found' });
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllStudents(req, res) {
    try {
      const student = await studentService.getAllStudents();
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateStudent(req, res) {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      if (!student||student.length==0) return res.status(404).json({ error: 'Student not found' });
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteStudent(req, res) {
    try {
      const result = await studentService.deleteStudent(req.params.id);
      if (!result) return res.status(404).json({ error: 'Student not found' });
      res.status(200).json({message:'deleted successfuly'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,
  async getStudentSubjects(req, res) {
    try {
     const subjects= await studentService.getSubjects(req.body.id);
      if (!subjects) return res.status(404).json({ error: 'Student not found' });
      res.json(subjects);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getClass(req, res) {
    try {
      const student = await studentService.getStudent(req.body.id);
      if(!student) return res.status(404).json({error:'Student Not found'})
     const Class= await studentService.getClass(req.body.id);
      if (!Class) return res.status(404).json({ error: 'Class not found' });
      res.json(Class);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getStudentArchive(req, res) {
    try {
      const studentExists = await studentService.getStudent(req.body.id);
      if (!studentExists) return res.status(404).json({ error: 'student not found' });
      const archive = await studentService.getStudentArchive(req.body.id);
      if (!archive) return res.status(404).json({ error: 'archive not found' });
      res.json(archive);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
    async getStudentSchedule(req, res) {
        try {
          const student = await studentService.getStudent(req.body.id);
          if(!student) return res.status(404).json({error:'Student Not found'});
            const schedules = await studentService.getStudentSchedule(req.body.id);
            if (!schedules) return res.status(404).json({ error: 'Class not found' });
            res.json(schedules);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

};