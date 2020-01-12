import { firestore } from 'firebase/app';

export interface Registration {
    id?: string;
    personal: {
        first_name: string;
        last_name: string;
        birthday?: string | firestore.Timestamp;
        sex?: string;
    };
    address: {
        street: string;
        house_nr?: string;
        postal_code: string;
        city: string;
        country?: string;
    };
    contact: {
        email: string;
        email2?: string;
        phone: string;
        phone2?: string;
        mobile?: string;
        contact_preferences?: string;
    };
    timestamp?: firestore.Timestamp;
    event: {
        event_id: string;
        first_aid?: string;
        toerustingsweekend?: {
            participation: string;
            extra_persons: string;
            roommate1: string;
            participation_roommate1: string;
            roommate2: string;
            participation_roommate2: string;
            roommate3: string;
            participation_roommate3: string;
            roommate4: string;
            participation_roommate4: string;
            roommate5: string;
            participation_roommate5: string;
            roommate6: string;
            participation_roommate6: string;
            heard_about_us: string;
            privacy: string;
            photo_permission: string;
            keep_updated: string;
            signed: string;
        };
        tieners?: {
            first_time?: string;
            roommates?: string;
            job?: string;
            motivation?: string;
            participation?: string;
            track?: string;
        },
        celebrate?: {
            line_items?: Array<CelebrateLineItems>,
            links: any;
            created_via: string;
            currency: string;
            currency_symbol: string;
            customer_id: string;
            customer_note: string;
            date_completed: string | null;
            date_completed_gmt: string | null;
            date_created: string;
            date_created_gmt: string;
            date_modified: string;
            date_modified_gmt: string;
            date_paid: string | null;
            date_paid_gmt: string | null;
            discount_tax: string;
            discount_total: string;
            fee_lines: any;
            order_key: string;
            parent_id: string;
            payment_method: string;
            payment_method_title: string;
            prices_include_tax: boolean;
            status: string;
            total: string;
            total_tax: string;
            transaction_id: string;
        }
    };
    payment?: {
        mollie_payment_id?: string;
        mollie_order_id?: string;
        mollie_customer_id?: string;
        mollie_payment_mode?: string;
        mollie_cancelled_payment_id?: string;
    };
    notes?: string;
    raw_data: any;
}

interface CelebrateLineItems {
    name: string;
    price: number | string;
    sku: string;
    quantity: number;
    product_id: number;
    subtotal: string;
    subtotal_tax: string;
    tax_class: string;
    taxes: any;
    total: string;
    total_tax: string;
    variation_id: string;
    meta_data: any;
}