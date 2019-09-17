const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: functions.config().mollie.api_key });

exports = module.exports = functions.https.onRequest(async (request: any, response: any) => {
    const paymentId = request.body.id;
    let payment = await mollieClient.payments.get(paymentId);

    payment = await JSON.parse(JSON.stringify(payment)); // convert the nested object to a plain object
    await admin.firestore().collection('payments').doc(payment.metadata.registration_id).set(payment)
    response.end();
});
