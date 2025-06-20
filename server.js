const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyparser=require('body-parser');
const cors=require('cors');
const userService = require('./api/services/userService');

// Firebase SDK
const admin = require('./firebase/firebase-admin.js');
require('dotenv').config();
// Middleware
app.use(express.json());

//to parse json
app.use(bodyparser.json());

//Cores protection
app.use(cors());

const message = {
  notification: {
    title: 'ttil',
    body: 'go here'
  },
  token: 'd0r5wGPBlRgHcD1bQgfiAs:APA91bFxZVyc3Eu_6goXYupeMTz4KXvvoMlDj6RJA5-wkXJq7U6joQW0rSKzLRWwDdyklEBeJoOCuh3-Xn7SDty8UdmmMgwYSjyYoPtMu6feiTyKLaBRtes'
};
async function ll (){
  const response = await admin.messaging().send(message);
}


// userService.sendMessage('+963948576512','baders');

// API routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});