// interface of customer
export interface IProduct {
    _id?: string;
    name: string;
    category?: string;
    qty?: number;
    rate: number;
    total?: number;
    dated?: number;
}