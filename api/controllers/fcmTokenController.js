const fcmTokensService = require('../services/fcmTokensService');
const userService = require('../services/userService.js');
const roleService = require('../services/roleService.js');
const notificationService = require('../services/notificationService.js');
const {  validationResult } = require('express-validator');
const admin = require('../../firebase/firebase-admin.js');

module.exports = {

  async createFcmToken(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {
          return res.status(400).json({ errors: errors.array() });
      } 
      const { token, device_type } = req.body;
      const FcmToken = await fcmTokensService.createFcmToken({
        user_id: req.user.id,
        token,
        device_type,
        created_at: new Date()
      });
      res.status(201).json(FcmToken);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async sendMessage(req, res) {
    try {
      const{user_id,title,body}=req.body;
      const user=await userService.getUser(user_id);
      console.log(user)
      const role=await roleService.getRoleById(user.role_id);
      console.log(role)
      if(!(role[0].name=="student")){
        throw new Error('error the user is not student ');
       
      }
      const FcmTokens = await fcmTokensService.getTokensForUser(user_id);
      if (!FcmTokens||FcmTokens.length==0) return res.status(404).json({ error: 'Fcm tokens  not found' });

      const message = {
        notification: { title, body },
        data: {},
        tokens: FcmTokens
      };
      const response = await admin.messaging().sendEachForMulticast(message);
      if (!response) {
        throw new Error('error in firebase');
    }
      const Notification = await notificationService.createNotification({
        user_id:user_id,
        title,
        body,
        sent_at: new Date()
      });
      if (!Notification) {
        throw new Error('error in notification create');
    }
    console.log(response,Notification);
      res.json({msg:'successfully'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getFcmToken(req, res) {
    try {
      const FcmToken = await fcmTokensService.getFcmToken(req.params.id);
      if (!FcmToken) return res.status(404).json({ error: 'Fcm token  not found' });
      res.json(FcmToken);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTokensForUser(req, res) {
    try {
      const FcmTokens = await fcmTokensService.getTokensForUser(req.params.id);
      if (!FcmTokens) return res.status(404).json({ error: 'Fcm tokens  not found' });
      res.json(FcmTokens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllFcmTokenes(req, res) {
    try {
      const FcmToken = await fcmTokensService.getAllFcmTokens();
      res.json(FcmToken);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateFcmToken(req, res) {
    try {
      const FcmToken = await fcmTokensService.updateFcmToken(req.params.id, req.body);
      if (!FcmToken ||FcmToken.length==0) return res.status(404).json({ error: 'Fcm token  not found' });
      res.json(FcmToken);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteFcmToken(req, res) {
    try {
      const result = await fcmTokensService.deleteFcmToken(req.params.id);
      if (!result) return res.status(404).json({ error: 'Fcm token not found' });
      res.status(200).json({message:'deleted successfuly'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


};