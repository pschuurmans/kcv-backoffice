export interface Payment {
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
    };
}
