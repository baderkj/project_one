const { db } = require('../../config/db');
const behaviorService = require('../services/behaviorService');

module.exports = {
  async getAllBehaviors(req, res) {
    try {
      const behaviors = await behaviorService.getAllBehaviors();
      res.json(behaviors);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch behaviors' });
    }
  },

  async getBehavior(req, res) {
    try {
      const behavior = await behaviorService.getBehaviorById(req.params.id);
      if (!behavior) {
        return res.status(404).json({ error: 'Behavior not found' });
      }
      res.json(behavior);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch behavior' });
    }
  },

  async createBehavior(req, res) {
    try {
      const { student_id, description, date, type } = req.body;
      const newBehavior = await behaviorService.createBehavior({
        student_id,
        description,
        date,
        type,
      });
      res.status(201).json(newBehavior);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create behavior' });
    }
  },

  async updateBehavior(req, res) {
    try {
      const updatedBehavior = await behaviorService.updateBehavior(
        req.params.id,
        req.body
      );
      if (!updatedBehavior) {
        return res.status(404).json({ error: 'Behavior not found' });
      }
      res.json(updatedBehavior);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update behavior' });
    }
  },

  async deleteBehavior(req, res) {
    try {
      const deleted = await behaviorService.deleteBehavior(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Behavior not found' });
      }
      res.json({ message: 'Behavior deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete behavior' });
    }
  },

  async getStudentBehavior(req, res) {
    try {
      const { student_id } = req.body;
      const studentBehaviors = await db
        .select('*')
        .from('behaviors')
        .where('student_id', student_id);

      res.json(studentBehaviors);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get behaviors' });
    }
  },
};
