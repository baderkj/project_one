const subjectService = require('../services/subjectService');

const { validationResult } = require('express-validator');

const bcrypt=require('bcrypt-nodejs');
module.exports = {

  async createSubject(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
          return res.status(400).json({ errors: errors.array() });
      } 
      const Subject = await subjectService.createSubject(req.body);
      res.status(201).json(Subject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getSubject(req, res) {
    try {
      const Subject = await subjectService.getSubject(req.params.id);
      if (!Subject) return res.status(404).json({ error: 'Subject not found' });
      res.json(Subject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllSubjectes(req, res) {
    try {
      const Subject = await subjectService.getAllSubjectes();
      res.json(Subject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateSubject(req, res) {
    try {
      const Subject = await subjectService.updateSubject(req.params.id, req.body);
      if (!Subject||Subject.length==0) return res.status(404).json({ error: 'Subject not found' });
      res.json(Subject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteSubject(req, res) {
    try {
      const result = await subjectService.deleteSubject(req.params.id);
      if (!result) return res.status(404).json({ error: 'Subject not found' });
      res.status(200).json({message:'deleted successfuly'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};