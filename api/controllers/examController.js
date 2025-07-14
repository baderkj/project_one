const examService = require('../services/examService');
const { validationResult } = require('express-validator');

module.exports = {
    async createExam(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const Exam = await examService.createExam(req.body);
            res.status(201).json(Exam);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getExam(req, res) {
        try {
            const Exam = await examService.getExam(req.params.id);
            if (!Exam) return res.status(404).json({ error: 'Exam not found' });
            res.json(Exam);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllExams(req, res) {
        try {
            const Exams = await examService.getAllExams();
            res.json(Exams);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateExam(req, res) {
        try {
            const Exam = await examService.updateExam(req.params.id, req.body);
            if (!Exam||Exam.length==0) return res.status(404).json({ error: 'Exam not found' });
            res.json(Exam);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteExam(req, res) {
        try {
            const result = await examService.deleteExam(req.params.id);
            if (!result) return res.status(404).json({ error: 'Exam not found' });
            res.status(200).json({message:'deleted successfuly'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getExamQuestion(req, res) {
        try {
          const Exam = await examService.getExam(req.body.id);
          if(!Exam) return res.status(404).json({error:'Exam Not found'});
            const result = await examService.getExamQuestion(req.body.id);
            if (!result) return res.status(404).json({ error: 'Exam questions not found' });
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};