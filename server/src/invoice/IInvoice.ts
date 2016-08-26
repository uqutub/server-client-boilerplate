import { ICustomer } from '../customer/index';
import { IProduct } from '../product/index';

// interface of invoice
export interface IInvoice {
    _id?: string;
    customer: ICustomer;
    product: IProduct[];
    total: number;
    dated?: number;
}