export interface Event {
    name: string;
    year: string;
    description: string;
    tag: string;
    price: Price[];
    mollie: boolean;
}

interface Price {
    participation: string;
    cost: string;
}
