import { Registration } from "../../models/registration";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.firestore
    .document('staging/{stagingId}')
    .onCreate(async (change: any, context: any) => {
        const doc = change.data();

        if (doc.woocommerce === "ja" && doc.celebrate === "ja") {
            const registration: Registration = {
                personal: {
                    first_name: doc.billing.first_name,
                    last_name: doc.billing.last_name,
                },
                address: {
                    street: doc.billing.address_1,
                    postal_code: doc.billing.postcode,
                    city: doc.billing.city,
                    country: doc.billing.country,
                },
                contact: {
                    email: doc.billing.email,
                    phone: doc.billing.phone,
                },
                event: {
                    event_id: doc.event_id,
                    type: "celebrate",
                    celebrate: {
                        line_items: doc.line_items,
                        links: doc._links,
                        created_via: doc.created_via,
                        currency: doc.currency,
                        currency_symbol: doc.currency_symbol,
                        customer_id: doc.customer_id,
                        customer_note: doc.customer_note,
                        date_completed: doc.date_completed,
                        date_completed_gmt: doc.date_completed_gmt,
                        date_created: doc.date_created,
                        date_created_gmt: doc.date_created_gmt,
                        date_modified: doc.date_modified,
                        date_modified_gmt: doc.date_modified_gmt,
                        date_paid: doc.date_paid,
                        date_paid_gmt: doc.date_paid_gmt,
                        discount_tax: doc.discount_tax,
                        discount_total: doc.discount_total,
                        fee_lines: doc.fee_lines,
                        order_key: doc.order_key,
                        parent_id: doc.parent_id,
                        payment_method: doc.payment_method,
                        payment_method_title: doc.payment_method_title,
                        prices_include_tax: doc.prices_include_tax,
                        status: doc.status,
                        total: doc.total,
                        total_tax: doc.total_tax,
                        transaction_id: doc.transaction_id
                    }
                }
            }
            admin.firestore().collection('staging-registration').add(registration)
                .then((ref: any) => console.log(ref))
                .catch((err: any) => console.log(err));
        }
    })
