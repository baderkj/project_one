const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt-nodejs');
const { db } = require('../../config/db');
const jwt = require('jsonwebtoken');
const { messaging } = require('firebase-admin');
const roleService = require('../services/roleService');
require('dotenv').config();
module.exports = {
  async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 1. First check if user exists
      const user = await db
        .select('*')
        .from('users')
        .where('email', '=', email)
        .first();

      if (!user) {
        return res.status(400).json('Wrong credentials');
      }

      // 2. Validate password
      const isValid = bcrypt.compareSync(password, user.password_hash);

      if (!isValid) {
        return res.status(400).json('Wrong credentials');
      }
      console.log(user.role_id);
      console.log(user.email);
      console.log(user.id);
      // 3. Generate token (exclude sensitive data)
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          roleId: user.role_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // 4. Return user data (without password)
      const { password_hash, ...userData } = user;
      res.json({ user: userData, token });
    } catch (err) {
      console.error('SignIn error:', err);
      res.status(500).json('Internal server error');
    }
  },

  async createUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { name, email, password, role_id, phone, birth_date } = req.body;
      const hash = bcrypt.hashSync(password);
      const role = await roleService.getAllRoles();
      const validRole = role.filter((role) => role_id === role.id);
      if (validRole.length === 0) {
        return res.status(400).json({ error: 'invalid role' });
      }
      const user = await userService.createUser({
        name: name,
        birth_date: birth_date,
        email: email,
        phone: phone,
        role_id: validRole[0].id,
        password_hash: hash,
      });
      res.status(201).json(user);
      return user.id;
    } catch (error) {
      res.status(400).json({ error: error.message, msg: 'bad data' });
    }
  },

  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user || user.length == 0)
        return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const result = await userService.deleteUser(req.params.id);
      if (!result) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'deleted successfuly' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
