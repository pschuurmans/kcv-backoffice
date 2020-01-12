const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.

exports.scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context: any) => {
    console.log('This will be run every 5 minutes!');
    return null;
  });