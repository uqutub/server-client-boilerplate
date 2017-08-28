import { ICustomer } from '../customer/index';

// interface of invoice
export interface ILedger {
    _id?: string;
    customer: ICustomer;
    credit: number;
    debit: number;
    remarks: string;
    dated: number;
}