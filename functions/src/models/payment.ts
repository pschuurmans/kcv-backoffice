import { firestore } from 'firebase/app';

export interface Event {
    status: Status;
    timestamp: firestore.Timestamp;
    mollie?: any;
}

enum Status {
    open,
    paid,
    expired,
    failed,
    canceled,
}