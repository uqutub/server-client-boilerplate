import {HttpService} from './httpService';
import {serverAPI} from './config';

// stores
import {HandleStore, ProductStore, CustomerStore} from '../stores/index';

export const ApplicationServices: any[] = [
    HttpService
    , HandleStore
    , ProductStore
    , CustomerStore
];

export {
    HttpService
    , HandleStore
    , ProductStore
    , CustomerStore
};