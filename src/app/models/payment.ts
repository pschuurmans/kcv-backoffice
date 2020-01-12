import { firestore } from 'firebase/app';

export interface Payment {
    status: Status;
    timestamp: firestore.Timestamp;
    mollie?: {
        resource: string;
        id: string;
        mode: string;
        createdAt: string;
        amount: {
            value: string;
            currency: string;
        };
        description: string;
        method: any;
        metadata: any;
        status: string;
        isCancelable: boolean;
        expiresAt: string;
        details: any;
        profileId: string;
        sequenceType: string;
        redirectUrl: string;
        webhookUrl: string;
        _links: {
            self: {
                href: string;
                type: string;
            },
            checkout: {
                href: string;
                type: string;
            },
            documentation: {
                href: string;
                type: string
            }
        }
    };
}

enum Status {
    open,
    paid,
    expired,
    failed,
    canceled,
}
