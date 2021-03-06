import { User } from "../../models/user";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.https.onCall(async (data: User, context: any) => {
    const doc = {
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
        uid: data.uid
    };

    await admin.firestore().collection('users').doc(data.uid).set(doc);
    console.log('Written data to doc with id ' + data.uid);
});
