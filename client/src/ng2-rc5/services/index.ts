import {CustomerService, ICustomer} from './customer/customer';
import {ProductService, IProduct} from './product/product';
import {HttpService} from './httpService';

export const ApplicationServices: any[] = [
    CustomerService
    , ProductService
    , HttpService
];

export {
    CustomerService
    , ICustomer
    , ProductService
    , IProduct
    , HttpService
};