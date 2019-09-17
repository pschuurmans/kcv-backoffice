export interface Event {
    name: string;
    year: string;
    description: string;
    tag: string;
    price: Price[];
}

export interface Price {
    participation: string;
    cost: string;
}
