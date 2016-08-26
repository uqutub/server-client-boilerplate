import {HandleStore} from './handleStore';
import {CustomerStore} from './customer/customer';
import {ProductStore} from './product/product';
import {InvoiceStore} from './invoice/invoice';

export const ApplicationStores: any[] = [
    HandleStore
    , CustomerStore
    , ProductStore
    , InvoiceStore
];

export {
    HandleStore
    , CustomerStore
    , ProductStore
    , InvoiceStore
};