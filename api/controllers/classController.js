const classService = require('../services/classService');

const {  validationResult } = require('express-validator');

const bcrypt=require('bcrypt-nodejs');
module.exports = {

  async createClass(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
          return res.status(400).json({ errors: errors.array() });
      } 
      const Class = await classService.createClass(req.body);
      res.status(201).json(Class);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getClass(req, res) {
    try {
      const Class = await classService.getClass(req.params.id);
      if (!Class) return res.status(404).json({ error: 'Class not found' });
      res.json(Class);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllClasses(req, res) {
    try {
      const Class = await classService.getAllClasses();
      res.json(Class);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateClass(req, res) {
    try {
      const Class = await classService.updateClass(req.params.id, req.body);
      if (!Class) return res.status(404).json({ error: 'Class not found' });
      res.json(Class);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteClass(req, res) {
    try {
      const result = await classService.deleteClass(req.params.id);
      if (!result) return res.status(404).json({ error: 'Class not found' });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStudentsInClass(req, res) {
    try {
      const classExists = await classService.getClass(req.body.id);
      if (!classExists) return res.status(404).json({ error: 'Class not found' });
      const Students = await classService.getStudentsInClass(req.body.id);
      if (!Students) return res.status(404).json({ error: 'Students not found' });
      res.json(Students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};