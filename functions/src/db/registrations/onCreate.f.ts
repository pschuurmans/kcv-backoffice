const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

import { EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { Event, Price } from "../../models/event";

const mailgun = require("mailgun-js");
const host = 'api.eu.mailgun.net';
const mg = mailgun({
    apiKey: functions.config().mailgun.api_key,
    domain: functions.config().mailgun.domain,
    host: host
});

const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: functions.config().mollie.api_key });

exports = module.exports = functions.firestore
    .document('registrations/{registrationId}')
    .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
        const registration: any = snapshot.data();
        const event: Event = await readEvent(registration.event.event_id);

        if (registration.event.event_id !== undefined && (registration.event.event_id.includes("4u") || registration.event.event_id.includes("ht"))) {
            const registrationCost = event.price.find((price: Price) => price.participation === registration.event.tieners.participation);
            
            if (event.mollie) {
                const payment = await createPayment(
                    registrationCost!.cost,
                    `${registration.personal.first_name} ${registration.personal.last_name} - ${event.name} ${event.year}`,
                    registration.contact.email,
                    context.params.registrationId
                );
    
                const data = {
                    from: 'Stichting KCV <backoffice@mail.kcv-net.nl>',
                    to: registration.contact.email,
                    subject: `Bevestiging registratie ${event.name} ${event.year}`,
                    template: 'confirm-registration',
                    'h:X-Mailgun-Variables': JSON.stringify({
                        event,
                        registration,
                        registrationCost: registrationCost!.cost,
                        payment_link: payment._links.checkout.href
                    }),
                };
    
                mg.messages().send(data, function (error: any, body: any) {
                    console.log(body);
                });
            }
        }

    });

function readEvent(event_id: string) {
    const tag = event_id.split(/-/)[0];
    const year = event_id.split(/-/)[1];

    // let query = admin.firestore().collection('events')
    // query = query.where('tag', '==', tag);
    // query = query.where('year', '==', year);
    // const data = query.get().then((doc: any) => {
    //     const event = doc.data();
    //     return event;
    // });
    // return data;
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

    // .then((doc: any) => {
    //     const event = doc.data();
    //     return event;
    // });
}

function createPayment(price: string, description: string, billingEmail: string, registrationId: string) {
    return mollieClient.payments.create({
        amount: {
            currency: 'EUR',
            value: price
        },
        description: description,
        redirectUrl: `https://www.4u-hightime.nl/bedankt`,
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