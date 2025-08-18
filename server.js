const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyparser = require('body-parser');
const cors = require('cors');
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

        body: 'abd nigga',
    },
    token: 'c5oIOoKKy3XSyvuN2VFk6M:APA91bFkJzGWdIjoeJItq2prFtZbSeKrQGJ7XNsLYx6RVyPpuuVwBzH1DAPFuC9Et9iIZFOHupUx4YSKdYkkLCvxGopUfLkGetjKolHB5g5zrRlDtw-nOWQ',

    // token: 'fXGW_K3eUHy0Uzxcal5hDE:APA91bEpouIwNloMF71qh5mGYeHDhWmJ9tMNg-nNA3oC-7axbyd7QLkx0pTIsj5W0VynSW6zLCh883Mj2ljPSP5GL0KDHKi-OGPm2NQxQxp39J3-gWBLxO8'
};
async function ll() {
    const response = await admin.messaging().send(message);
    console.log(response);
}

// ll();

// userService.sendWhatsAppMessage('+963948576512','usdsdfs');

// API routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
