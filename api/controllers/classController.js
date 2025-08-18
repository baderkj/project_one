const classService = require('../services/classService');
const { db } = require('../../config/db');
const { validationResult } = require('express-validator');

module.exports = {
    async createClass(req, res) {
        try {
            const classData = req.body;
            // Validate required fields first
            if (
                !(
                    classData?.class_name ||
                    classData?.floor_number === undefined
                )
            ) {
                throw new Error('class_name and floor_number are required');
            }

            return await db.transaction(async (trx) => {
                // 1. Create the class with validated data
                const [classId] = await trx('classes')
                    .insert({
                        class_name: classData.class_name,
                        floor_number: classData.floor_number,
                        // Include other required fields as needed
                    })
                    .returning('id');

                // 2. Get all days and periods from database
                const days = await trx('days').select('id').orderBy('id');
                const periods = await trx('periods')
                    .select('id')
                    .orderBy('start_time');
                console.log(classId, days, periods);
                // 3. Generate schedule slots
                const scheduleSlots = days.flatMap((day) =>
                    periods.map((period) => ({
                        class_id: classId.id,
                        day_id: day.id,
                        period_id: period.id,
                        subject_id: null,
                    }))
                );

                // 4. Insert schedule slots
                await trx('schedules').insert(scheduleSlots);

                res.json({
                    success: true,
                    classId,
                    slotsCreated: scheduleSlots.length,
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getClass(req, res) {
        try {
            const Class = await classService.getClass(req.params.id);
            if (!Class)
                return res.status(404).json({ error: 'Class not found' });
            res.json(Class);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getClassesGroupedByGrade(req, res) {
        try {
            const Classes = await classService.getClassesGroupedByGrade();
            if (!Classes)
                return res.status(404).json({ error: 'Class not found' });
            res.json(Classes);
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
            const Class = await classService.updateClass(
                req.params.id,
                req.body
            );
            if (!Class || Class.length == 0)
                return res.status(404).json({ error: 'Class not found' });
            res.json(Class);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteClass(req, res) {
        try {
            const result = await classService.deleteClass(req.params.id);
            if (!result)
                return res.status(404).json({ error: 'Class not found' });
            res.status(200).json({ message: 'deleted successfuly' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getStudentsInClass(req, res) {
        try {
            const classExists = await classService.getClass(req.body.id);
            if (!classExists)
                return res.status(404).json({ error: 'Class not found' });
            const Students = await classService.getStudentsInClass(req.body.id);
            if (!Students)
                return res.status(404).json({ error: 'Students not found' });
            res.json(Students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getClassSchedule(req, res) {
        try {
            const classExists = await classService.getClass(req.body.id);
            if (!classExists)
                return res.status(404).json({ error: 'Class not found' });
            const schedules = await classService.getClassSchedule(req.body.id);
            if (!schedules)
                return res.status(404).json({ error: 'schedules not found' });
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getClassSubjectsWithTeachers(req, res) {
        try {
            const classId = req.params.id;
            const classExists = await classService.getClass(classId);
            if (!classExists)
                return res.status(404).json({ error: 'Class not found' });
            const data = await classService.getClassSubjectsWithTeachers(
                classId
            );
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
