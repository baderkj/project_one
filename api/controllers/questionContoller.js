const qustionService = require('../services/qustionService');
const { validationResult } = require('express-validator');

module.exports = {
    async createQuestion(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const Question = await qustionService.createQuestion(req.body);
            res.status(201).json(Question);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getQuestion(req, res) {
        try {
            const Question = await qustionService.getQuestion(req.params.id);
            if (!Question) return res.status(404).json({ error: 'Question not found' });
            res.json(Question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllQuestions(req, res) {
        try {
            const Questions = await qustionService.getAllQuestions();
            res.json(Questions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateQuestion(req, res) {
        try {
            const Question = await qustionService.updateQuestion(req.params.id, req.body);
            if (!Question|Question.length==0) return res.status(404).json({ error: 'Question not found' });
            res.json(Question);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteQuestion(req, res) {
        try {
            const result = await qustionService.deleteQuestion(req.params.id);
            if (!result) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json({message:'deleted successfuly'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};