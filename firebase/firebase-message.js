const { getMessaging, getToken } =require("firebase/messaging") ;
const {initializeApp}= require("firebase/app");
// Get registration token

const firebaseConfig = {
    apiKey: "AIzaSyCSK6L_OEDAIFzJWvzfle2QfQccMyVj-e0",
    authDomain: "project-one-a5b2f.firebaseapp.com",
    projectId: "project-one-a5b2f",
    storageBucket: "project-one-a5b2f.firebasestorage.app",
    messagingSenderId: "1055710507032",
    appId: "1:1055710507032:web:977cbed6f1423bc7a1536d",
    measurementId: "G-6P174P7XFB"
  };
  
const messageFirbase = () => {
    // const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
getToken(messaging, { vapidKey: 'BMVyeLbO_YuYaf83axdw84rPT-IyTZzH8sHAN0cGJLyT67dIqGaCtle0TgrRCfJ-KGETNAqpSwHHD2EtsYWWJno' })
  .then((currentToken) => {
    if (currentToken) {
      console.log('Token:', currentToken);
      // Send token to your server
     
    } else {
      console.log('No registration token available.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
  };
  
  module.exports = messageFirbase;