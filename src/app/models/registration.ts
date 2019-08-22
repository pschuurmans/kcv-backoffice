import { KcvRole } from './kcv-role';
import { FirstAid } from './first-aid';
import { Vog } from './vog';
import { KcvProtocol } from './kcv-protocol';
import { firestore } from 'firebase';

export interface Registration {
    // NAME
    first_name: string;
    last_name: string;

    // ADDRESS
    street: string;
    house_nr: string;
    postal_code: string;
    city: string;
    country: string;

    // CONTACT
    mobile: string;
    phone: string;
    phone2: string;
    email: string;
    email2: string;
    contact_preferences: string;

    // OTHER
    birthday: string | Date;
    vog: Vog;
    kcv_protocol: KcvProtocol;
    kcv_role: KcvRole[];
    avg: boolean;
    first_aid: FirstAid;
    notes: string;
    createdAt: firestore.Timestamp;

    event_id: number;
}
