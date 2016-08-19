import {HandleStore} from './handleStore';
import {CustomerStore, ICustomer} from './customer/customer';
import {ProductStore, IProduct} from './product/product';

export const ApplicationStores: any[] = [
    HandleStore
    , CustomerStore
    , ProductStore
];

export {
    HandleStore
    , CustomerStore
    , ICustomer
    , ProductStore
    , IProduct
};