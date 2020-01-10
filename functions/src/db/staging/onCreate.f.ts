const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {} // You do that because the admin SDK can only be initialized once.
import { firestore } from "firebase-admin";
import { EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { Registration } from "../../models/registration";

exports = module.exports = functions.firestore
  .document('staging/{stagingId}')
    .onCreate(async (snapshot: DocumentSnapshot, context: EventContext) => {
      const data: any = snapshot.data();
      let registration: Registration;

      if (data.event_id !== undefined && (data.event_id.includes("4u") || data.event_id.includes("ht"))) {
        registration = {
          id: snapshot.id,
          personal: {
            first_name: (data.Voornaam !== undefined ? data.Voornaam : ""),
            last_name: (data.Achternaam !== undefined ? data.Achternaam : ""),
            birthday: (data.Geboortedatum !== undefined ? data.Geboortedatum : ""),
            sex: (data.Geslacht !== undefined ? data.Geslacht : "")
          },
          address: {
            street: (data.Straat !== undefined ? data.Straat : ""),
            house_nr: (data.Huisnummer !== undefined ? data.Huisnummer : ""),
            postal_code: (data.Postcode !== undefined ? data.Postcode : ""),
            city: (data.Stad !== undefined ? data.Stad : ""),
            country: (data.Land !== undefined ? data.Land : ""),
          },
          contact: {
            email: (data.Email !== undefined ? data.Email : ""),
            phone: (data.Telefoonnummer !== undefined ? data.Telefoonnummer : ""),
            mobile: (data.Mobiel !== undefined ? data.Mobiel : ""),
          },
          event: {
            event_id: data.event_id,
            first_aid: (data.EHBO !== undefined ? data.EHBO : ""),
            tieners: {
              first_time: (data['Eerste keer'] !== undefined ? data['Eerste keer'] : ""),
              room_mates: (data.Kamergenoten !== undefined ? data.Kamergenoten : ""),
              job: (data.Taak !== undefined ? data.Taak : ""),
              motivation: (data.Motivatie !== undefined ? data.Motivatie : ""),
              participation: (data.Deelname !== undefined ? data.Deelname : ""),
              track: (data.Track !== undefined ? data.Track : ""),
            }
          },
          notes: (data.Bijzonderheden !== undefined ? data.Bijzonderheden : ""),
          timestamp: firestore.Timestamp.now(),
          raw_data: data // to save original data
        };

        admin.firestore().collection('registrations').doc(snapshot.id).set(registration)
          .then((ref: any) => {
            console.log("Created registration document: " + snapshot.id);
            deleteDocument(snapshot.id); // delete staging document when registrations document is created
          })
          .catch((err: any) => console.error(err));
      }
    })

function deleteDocument(id: string) {
  admin.firestore().collection('staging').doc(id).delete()
    .then((ref: any) => console.log("Deleted staging document: " + id))
    .catch((err: any) => console.error(err));
}
