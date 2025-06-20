const academicYearService = require('../services/academicYearService');

const {  validationResult } = require('express-validator');

const bcrypt=require('bcrypt-nodejs');
module.exports = {

  async createAcademicYear(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
          return res.status(400).json({ errors: errors.array() });
      } 
      const AcademicYear = await academicYearService.createAcademicYear(req.body);
      res.status(201).json(AcademicYear);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAcademicYear(req, res) {
    try {
      const AcademicYear = await academicYearService.getAcademicYear(req.params.id);
      if (!AcademicYear) return res.status(404).json({ error: 'Academic Year not found' });
      res.json(AcademicYear);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllAcademicYeares(req, res) {
    try {
      const AcademicYear = await academicYearService.getAllAcademicYears();
      res.json(AcademicYear);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateAcademicYear(req, res) {
    try {
      const AcademicYear = await academicYearService.updateAcademicYear(req.params.id, req.body);
      if (!AcademicYear ||AcademicYear.length==0) return res.status(404).json({ error: 'Academic Year not found' });
      res.json(AcademicYear);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteAcademicYear(req, res) {
    try {
      const result = await academicYearService.deleteAcademicYear(req.params.id);
      if (!result) return res.status(404).json({ error: 'Academic Year not found' });
      res.status(200).json({message:'deleted successfuly'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // async getStudentsInAcademicYear(req, res) {
  //   try {
  //     const AcademicYearExists = await academicYearService.getAcademicYear(req.body.id);
  //     if (!AcademicYearExists) return res.status(404).json({ error: 'AcademicYear not found' });
  //     const Students = await academicYearService.getStudentsInAcademicYear(req.body.id);
  //     if (!Students) return res.status(404).json({ error: 'Students not found' });
  //     res.json(Students);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

};