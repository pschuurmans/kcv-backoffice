import { Registration } from "../../models/registration";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.https.onCall(async (data: Registration, context: any) => {
    const doc = {
        first_name: data.first_name
    }

    admin.firestore().collection('registrations').add(doc)
        .then((ref: any) => {
            console.log('Added document with ID: ', ref.id);
        });
});