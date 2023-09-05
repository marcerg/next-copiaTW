const admin = require("firebase-admin");

const serviceAccount = require("./devter-f0751-firebase-adminsdk-ufi8n-4e50ed6787.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-6661a.firebaseio.com",
  });
} catch (e) {}
export const firestore = admin.firestore();
