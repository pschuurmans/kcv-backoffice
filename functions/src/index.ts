'use strict';
/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *   Author: David King
 *   Edited: Tarik Huber
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 *   Article:
 *     https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da
 */
const glob = require("glob");
const camelCase = require("camelcase");
const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**'});
for(let f=0,fl=files.length; f<fl; f++){
  const file = files[f];
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')); // Strip off '.f.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file);
  }
}

// import * as functions from 'firebase-functions';
// import { User } from './user';

// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.updateUserDoc = functions.https.onCall((data: User, context) => {
//     const doc = {
//         displayName: data.displayName,
//         email: data.email,
//         photoURL: data.photoURL,
//         uid: data.uid
//     }

//     admin.firestore().collection('users').doc(data.uid).set(doc);
// });

// exports.addDefaultAccessDoc = functions.https.onCall((data: User, context) => {
//     const doc = {
//         roles: ['GUEST']
//     }

//     admin.firestore().collection('access').doc(data.uid).set(doc);
// });


// const nodemailer = require("nodemailer");

/*
* Configure the email transport using the default SMTP transport and a GMail account.
* For Gmail, enable these:
* 1. https://www.google.com/settings/security/lesssecureapps
* 2. https://accounts.google.com/DisplayUnlockCaptcha
* For other types of transports such as Sendgrid see https://nodemailer.com/transports/
* TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
*/
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
// const mailTransport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: gmailEmail,
//         pass: gmailPassword,
//     },
// });

// Your company name to include in the emails
// const APP_NAME = 'Katholieke Charismatische Vernieuwing';

// exports.createNotificationOnUserCreation = functions.auth.user().onCreate((user) => {
//     const data = {
//         text: user.displayName + " heeft een account aangemaakt."
//     };

//     return admin.firestore().collection('notifications').add(data);
// });

// exports.createNotificationOnRegistrationCreation = functions.firestore
//     .document('registrations/{docId}')
//     .onCreate((doc) => {
//         const data = {
//             text: doc.firstname + " " + doc.lastname + " heeft zich geregistreerd voor " + doc.event + "."
//         };

//         return admin.firestore().collection('notifications').add(data);
//     });

// exports.sendConfirmationMailOnNewDeclaration = functions.firestore
// .document('declarations/{docId}')
// .onCreate((snap, context) => {
//     const data = snap.data(); 
//     const docId = context.params.docId

//     const mailOptions = {
//         from: `${APP_NAME} <noreply@kcv-net.nl>`,
//         to: data.email,
//     }

//     mailOptions.subject = 'Bevestiging ontvangst declaratie';
//     mailOptions.html = '<p>Beste ' + data.name + '.</p><p>De declaratie is opgeslagen in ons systeem met referentie id ' + docId + '.</p>'
//     return mailTransport.sendMail(mailOptions).then(() => {
//         console.log('Email sent to:', data.email);
//     })
// });
