import {HandleStore} from './handleStore';
import {CustomerStore} from './customer/customer';
import {ProductStore} from './product/product';
import {InvoiceStore} from './invoice/invoice';
import {CustomerLedgerStore} from './customerLedger/customerLedger';

export const ApplicationStores: any[] = [
    HandleStore
    , CustomerStore
    , ProductStore
    , InvoiceStore
    , CustomerLedgerStore
];

export {
    HandleStore
    , CustomerStore
    , ProductStore
    , InvoiceStore
    , CustomerLedgerStore
};