const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.
import { User } from "../../models/user";

exports = module.exports = functions.https.onCall((data: User, context: any) => {
    const doc = {
        roles: ['GUEST']
    }

    admin.firestore().collection('access').doc(data.uid).set(doc);
});