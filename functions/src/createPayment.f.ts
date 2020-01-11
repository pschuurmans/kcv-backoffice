import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
// tslint:disable-next-line: no-duplicate-imports
import { Response, Request } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { Price } from './models/event';
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: functions.config().mollie.api_key });

exports = module.exports = functions.https.onRequest(async (req: Request, res: Response) => {
    let registration_id: string;
    let registration: any;
    let event: any;
    let payment: any;

    registration_id = req.query.registration_id;

    registration_id === undefined ? res.send("Registratie is niet gevonden.") : null;
    registration_id === "" ? res.send("Registratie is ongeldig.") : null;

    await admin.firestore().doc('payments/' + registration_id).get()
        .then((snapshot: DocumentSnapshot) => {
            payment = snapshot.data();
        })
        .catch((err: any) => console.error(err));
    
    if (payment.status === "paid") {
        res.redirect(functions.config().function_url.root + '/payments/status/' + registration_id);
    } else {
        await admin.firestore().doc('registrations/' + registration_id).get()
        .then((snapshot: DocumentSnapshot) => {
            registration = snapshot.data();
        })
        .catch((err: any) => console.error(err));
        
        event = await readEvent(registration.event.event_id);
        
        const registrationCost = event.price.find((price: Price) => price.participation === registration.event.tieners.participation);
        
        const molliePayment = await createPayment(
            registrationCost!.cost,
            `${registration.personal.first_name} ${registration.personal.last_name} - ${event.name} ${event.year}`,
            registration.contact.email,
            registration_id
            );
            
            res.redirect(molliePayment._links.checkout.href);
    }
});

function readEvent(event_id: string) {
    const tag = event_id.split(/-/)[0];
    const year = event_id.split(/-/)[1];

    return admin.firestore()
        .collection('events')
        .where('tag', '==', tag)
        .where('year', '==', year)
        .get()
        .then((snapshot: any) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            let event = null;
            snapshot.forEach((doc: any) => {
                event = doc.data();
            });
            return event;
        })
        .catch((err: any) => {
            console.log('Error getting documents', err);
        });
}

function createPayment(price: string, description: string, billingEmail: string, registrationId: string) {
    return mollieClient.payments.create({
        amount: {
            currency: 'EUR',
            value: price
        },
        description: description,
        redirectUrl: functions.config().function_url.root + '/payments/status/' + registrationId,
        webhookUrl: functions.config().mollie.paymentwebhookurl,
        metadata: {
            registration_id: registrationId,
        },
        billingEmail: billingEmail,
        locale: 'nl_NL',
    })
        .then((payment: any) => {
            // Forward the customer to the payment.getCheckoutUrl()
            return payment
        })
        .catch((error: any) => {
            // Handle the error
            console.error(error)
        });
}