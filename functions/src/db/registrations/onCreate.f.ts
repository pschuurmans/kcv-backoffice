const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

import { EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { Event, Price } from "../../models/event";
import { Registration } from "../../models/registration";
import { firestore } from "firebase-admin";

const mailgun = require("mailgun-js");
const host = 'api.eu.mailgun.net';
const mg = mailgun({
    apiKey: functions.config().mailgun.api_key,
    domain: functions.config().mailgun.domain,
    host: host
});

exports = module.exports = functions.firestore
    .document('registrations/{registrationId}')
    .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
        const registration: any = snapshot.data();
        const event: Event = await readEvent(registration.event.event_id);

        await createPayment(snapshot.id, registration);

        if (registration.event.event_id !== undefined && (registration.event.event_id.includes("4u") || registration.event.event_id.includes("ht"))) {
            const registrationCost = event.price.find((price: Price) => price.participation === registration.event.tieners.participation);
            
            if (event.mollie) {
                const data = {
                    from: 'Stichting KCV <backoffice@mail.kcv-net.nl>',
                    to: registration.contact.email,
                    subject: `Bevestiging registratie ${event.name} ${event.year}`,
                    template: 'confirm-registration',
                    'h:X-Mailgun-Variables': JSON.stringify({
                        event,
                        registration,
                        registrationCost: registrationCost!.cost,
                        payment_link: functions.config().function_url.createpayment + "?registration_id=" + snapshot.id
                    }),
                    'h:Reply-To': 'info@kcv-net.nl'
                };
    
                mg.messages().send(data, function (error: any, body: any) {
                    console.log(body);
                });
            }
        }

    });

function createPayment(registrationId: string, registration: Registration) {
    return admin.firestore().doc('payments/' + registrationId).set({
        status: "open",
        timestamp: firestore.Timestamp.now(),
        registration: registration
    })
    .then((ref: any) => console.log(ref))
    .catch((err: any) => console.error(err));
}

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