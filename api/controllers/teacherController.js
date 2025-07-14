const teacherService = require('../services/teacherService');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const roleService = require('../services/roleService');

const bcrypt = require('bcrypt-nodejs');
const { getSubject } = require('./subjectController');
module.exports = {
  async createTeacher(req, res) {
    try {
      const { db } = require('../../config/db');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        name,
        email,
        password,
        phone,
        birth_date,
        specialization,
        hire_date,
        qualification,
      } = req.body;
      const hash = bcrypt.hashSync(password);
      const role = await roleService.gerRoleByName('teacher');
      const result = await db.transaction(async (trx) => {
        // Create user within transaction
        const user = await userService.createUser(
          {
            name: name,
            birth_date: birth_date,
            email: email,
            phone: phone,
            role_id: role[0].id,
            password_hash: hash,
          },
          trx
        );

        // Create student within the same transaction
        const Teacher = await teacherService.createTeacher(
          {
            user_id: user[0].id,
            specialization: specialization,
            hire_date: hire_date,
            qualification: qualification,
          },
          trx
        );

        return Teacher;
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        error: error.message,
        msg: 'Failed to create student. All changes rolled back.',
      });
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
      const teacher = await teacherService.updateTeacher(
        req.params.id,
        req.body
      );
      if (!teacher || teacher.length == 0)
        return res.status(404).json({ error: 'Teacher not found' });
      res.json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteTeacher(req, res) {
    try {
      const result = await teacherService.deleteTeacher(req.params.id);
      if (!result) return res.status(404).json({ error: 'Teacher not found' });
      res.status(200).json({ message: 'deleted successfuly' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getSubjects(req, res) {
    try {
      const teacher = await teacherService.getSubjects(req.body.id);
      if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



  async getTeacherSchedule(req, res) {
    try {
      const teacher = await teacherService.getTeacher(req.body.id);
      if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
      const schedule = await teacherService.getTeacherSchedule(req.body.id);
      if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


};

