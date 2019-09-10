import { firestore } from 'firebase';

export interface Registration {
    birthday: string | firestore.Timestamp;
    city: string;
    contact_preferences: string;
    country: string;
    email: string;
    email2: string;
    event_id: number;
    first_aid: string;
    first_name: string;
    first_time: string;
    house_nr: string;
    job: string;
    id?: string;
    last_name: string;
    mobile: string;
    motivation: string;
    notes: string;
    participation: string;
    phone: string;
    phone2: string;
    postal_code: string;
    street: string;
    timestamp: firestore.Timestamp;
    track: string;
}
