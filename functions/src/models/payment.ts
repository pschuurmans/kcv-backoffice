import { firestore } from 'firebase/app';
import { Registration } from './registration';

export interface Event {
    status: Status;
    timestamp: firestore.Timestamp;
    registration: Registration;
    mollie?: any;
}

enum Status {
    open,
    paid,
    expired,
    failed,
    canceled,
}