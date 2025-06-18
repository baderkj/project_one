const scheduleService = require('../services/scheduleService');
const { validationResult } = require('express-validator');

module.exports = {
    async createSchedule(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const Schedule = await scheduleService.createSchedule(req.body);
            res.status(201).json(Schedule);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getSchedule(req, res) {
        try {
            const schedule = await scheduleService.getSchedule(req.params.id);
            if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
            res.json(schedule);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllSchedules(req, res) {
        try {
            const schedules = await scheduleService.getAllSchedules();
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateSchedule(req, res) {
        try {
            const schedule = await scheduleService.updateSchedule(req.params.id, req.body);
            if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
            res.json(schedule);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteSchedule(req, res) {
        try {
            const result = await scheduleService.deleteSchedule(req.params.id);
            if (!result) return res.status(404).json({ error: 'Schedule not found' });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getPeriods(req, res) {
        try {
            const schedule = await scheduleService.getSchedule(req.body.id);
            if (!schedule) return res.status(404).json({ error: 'Schedule Not found' })
            const Period = await scheduleService.getPeriods(req.body.id);
            if (!Period) return res.status(404).json({ error: 'Period not found' });
            res.json(Period);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getDays(req, res) {
        try {
            const schedule = await scheduleService.getSchedule(req.body.id);
            if (!schedule) return res.status(404).json({ error: 'Schedule Not found' })
            const Day = await scheduleService.getDays(req.body.id);
            if (!Day) return res.status(404).json({ error: 'Day not found' });
            res.json(Day);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};