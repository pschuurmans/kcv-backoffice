import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserProfile = functions.auth.user().onCreate((user) => {
    createUserDoc(user);
    createDefaultAccessDoc(+user.uid);
});

function createUserDoc(user: any) {
    const data = {
        displayName: user.displayName,
        email: user.email
    };

    return admin.firestore().collection('users').doc(user.uid).set(data);
}

function createDefaultAccessDoc(uid: number) {
    const data = {
        roles: []
    };

    return admin.firestore().collection('access').doc(uid).set(data);
}

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
