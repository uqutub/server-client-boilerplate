import * as express from 'express';

type handlerType = (err: any, data: any, resolve: any, reject: any, exResponse?: express.Response) => void;

type returnObjectType = { err: any, data: any };

let responseHandler: handlerType = (err, data, resolve, reject, exResponse = null) => {
    if (err) {  // error handling
        if (exResponse) {
            // express.response && error has occurred then sending response 
            let obj: returnObjectType = { err: err, data: null };
            exResponse.json(obj);
        } else {
            // if error and express.response is not passing then handle promise reject 
            reject(err);
        }
    } else {
        // reslove promise if no error
        resolve(data);
    }
};

let responseJsonHandler = (err: any, data: any, exResponse: express.Response) => {
    let obj: returnObjectType = { err: err, data: data };
    exResponse.json(obj);
};


// function responseHandler(err: any, data: any, response: any): void;
// function responseHandler(err: any, data: any, resolve: any, reject: any): void;
// function responseHandler(err, data, resolve, reject): any { 
// }

export {
    handlerType
    , responseHandler
    , returnObjectType
    , responseJsonHandler
} 