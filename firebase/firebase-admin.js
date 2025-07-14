const admin = require("firebase-admin");

// Initialize Firebase Admin SDK

const serviceAccount = require('./project-one-a5b2f-firebase-adminsdk-fbsvc-d8c9188a63.json');

// const serviceAccount = require('./project-one-a5b2f-firebase-adminsdk-fbsvc-4f2132654a.json');




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
