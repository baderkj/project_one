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
    body: 'without vpn'
  },
  token: 'fXGW_K3eUHy0Uzxcal5hDE:APA91bEpouIwNloMF71qh5mGYeHDhWmJ9tMNg-nNA3oC-7axbyd7QLkx0pTIsj5W0VynSW6zLCh883Mj2ljPSP5GL0KDHKi-OGPm2NQxQxp39J3-gWBLxO8'
};
async function ll (){
  const response = await admin.messaging().send(message);
  console.log(response);
}
ll();

// userService.sendMessage('+963948576512','usdsdfs');

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