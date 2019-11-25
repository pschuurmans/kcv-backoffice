const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.firestore
    .document('staging/{stagingId}')
    .onCreate(async (change: any, context: any) => {
        const doc = change.data();

        if (doc.woocommerce === "1") {
            console.log('New WooCommerce order')
        }
    })
