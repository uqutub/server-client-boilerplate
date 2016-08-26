import {HttpService} from './httpService';
import {serverAPI} from './config';

// stores
import {HandleStore, ProductStore, CustomerStore, InvoiceStore} from '../stores/index';

export const ApplicationServices: any[] = [
    HttpService
    , HandleStore
    , ProductStore
    , CustomerStore
    , InvoiceStore
];

export {
    HttpService
    , HandleStore
    , ProductStore
    , CustomerStore
    , InvoiceStore
};