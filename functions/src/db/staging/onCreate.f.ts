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

    if (data.event_id !== undefined && (data.event_id.includes("4u") || data.event_id.includes("ht"))) {
      createTienersRegistration(data, snapshot.id);
    }

    if (data.event_id !== undefined && data.event_id.includes("tw")) {
      createToerustingsweekendRegistration(data, snapshot.id);
    }
  })

function deleteDocument(id: string) {
  admin.firestore().collection('staging').doc(id).delete()
    .then((ref: any) => console.log("Deleted staging document: " + id))
    .catch((err: any) => console.error(err));
}

function createToerustingsweekendRegistration(data: any, snapshotId: string) {
  let registration: Registration;
  registration = {
    id: snapshotId,
    personal: {
      first_name: data.Voornaam,
      last_name: data.Achternaam,
      birthday: data.Geboortedatum,
    },
    address: {
      street: data['Straat en huisnummer'],
      postal_code: data['Postcode '],
      city: data.Woonplaats,
    },
    contact: {
      email: data['E-mailadres'],
      phone: data.Telefoonnummer,

    },
    event: {
      event_id: data.event_id,
      toerustingsweekend: {
        participation: data['Totale kosten en soort accommodatie'],
        extra_persons: data['Wilt u extra personen opgeven die gebruik maken van dezelfde kamer'],
        roommate1: data['Gegevens kamergenoot 1'],
        participation_roommate1: data['Accommodatie kamergenoot 1'],
        roommate2: data['Gegevens kamergenoot 2'],
        participation_roommate2: data['Accommodatie kamergenoot 2'],
        roommate3: data['Gegevens kamergenoot 3'],
        participation_roommate3: data['Accommodatie kamergenoot 3'],
        roommate4: data['Gegevens kamergenoot 4'],
        participation_roommate4: data['Accommodatie kamergenoot 4'],
        roommate5: data['Gegevens kamergenoot 5'],
        participation_roommate5: data['Accommodatie kamergenoot 5'],
        roommate6: data['Gegevens kamergenoot 6'],
        participation_roommate6: data['Accommodatie kamergenoot 6'],
        heard_about_us: data['Hoe heeft u van het Toerustingsweekend gehoord?'],
        privacy: data['Ik heb de Privacyverklaring van de KCV gelezen en ben hiermee akkoord. '],
        photo_permission: data['Hierbij geef ik toestemming om eventuele foto\'s of video\'s die tijdens het Toerustingsweekend worden gemaakt te gebruiken voor promotiedoeleinden van de KCV'],
        keep_updated: data['Vink aan hoe wij u het beste op de hoogte kunnen stellen van publicaties, bijeenkomsten, conferenties en aanbiedingen.'],
        signed: data['Ik heb de bovenstaande vragen volledig en naar waarheid ingevuld.']
      }
    },
    notes: data['Bijzonderheden m.b.t. de kamer / dieet / allergie'],
    timestamp: firestore.Timestamp.now(),
    raw_data: data
  };

  admin.firestore().collection('registrations').doc(snapshotId).set(registration)
    .then((ref: any) => {
      console.log("Created registration document: " + snapshotId);
      deleteDocument(snapshotId); // delete staging document when registrations document is created
    })
    .catch((err: any) => console.error(err));
}

function createTienersRegistration(data: any, snapshotId: string) {
  let registration: Registration;
  registration = {
    id: snapshotId,
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
        roommates: (data.Kamergenoten !== undefined ? data.Kamergenoten : ""),
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

  admin.firestore().collection('registrations').doc(snapshotId).set(registration)
    .then((ref: any) => {
      console.log("Created registration document: " + snapshotId);
      deleteDocument(snapshotId); // delete staging document when registrations document is created
    })
    .catch((err: any) => console.error(err));
}
