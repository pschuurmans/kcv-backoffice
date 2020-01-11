import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
admin.initializeApp(functions.config().firebase, 'dbMolliepaymentsOnRequest');

const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: functions.config().mollie.api_key });

exports = module.exports = functions.https.onRequest(async (request: any, response: any) => {
    const paymentId = request.body.id;
    let payment = await mollieClient.payments.get(paymentId);

    payment = await JSON.parse(JSON.stringify(payment)); // convert the nested object to a plain object

    await admin.firestore()
        .doc('payments/' + payment.metadata.registration_id)
        .update({
            status: payment.status,
            timestamp: admin.firestore.Timestamp.now(),
            mollie: payment,
        })

    response.end();
});
