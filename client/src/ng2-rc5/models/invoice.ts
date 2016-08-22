import { ICustomer } from './customer';
import { IProduct } from './product';

// interface of invoice
export interface IInvoice {
    _id?: string;
    customer: ICustomer;
    product: [IProduct];
    total: number;
    dated?: number;
}