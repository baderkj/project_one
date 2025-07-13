const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
<<<<<<< HEAD
// const serviceAccount = require('./project-one-a5b2f-firebase-adminsdk-fbsvc-4f2132654a.json');
=======
const serviceAccount = require('./project-one-a5b2f-firebase-adminsdk-fbsvc-d8c9188a63.json');
>>>>>>> ed7006f460fc443032659759ef1532a35edcf456

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
