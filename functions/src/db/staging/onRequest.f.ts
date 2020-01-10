import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.https.onRequest((req: any, res: any) => {
    const body = req.body;
    const query = req.query;

    // admin.firestore().collection('staging').add({...body, ...query})
    //     .then(ref => res.send({ id: ref.id, ...body, ...query }))
    //     .catch(err => res.send(err));
    console.log(body);
    console.log(query);
});
