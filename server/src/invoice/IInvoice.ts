// interface of invoice
export interface IInvoice {
    _id?: string;
    customer: {};
    product: [{}];
    total: number;
    dated?: number;
}