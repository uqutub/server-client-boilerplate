import * as express from 'express';
import * as path from 'path';
let pdf = require('html-pdf');

import {responseJsonHandler} from '../helper/helper';

export let controller = {
    get: (request: express.Request, response: express.Response) => {
        responseJsonHandler(null, { 'data': null }, response);
    },
    post: (request: express.Request, response: express.Response) => {
        if (request.body && request.body.html) {
            let options = {
                // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
                // height: "10.5in",        // allowed units: mm, cm, in, px 
                // width: "8in",            // allowed units: mm, cm, in, px 
                //- or -
                format: "A4",               // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
                orientation: "portrait",    // portrait or landscape 
                // File options 
                type: "pdf",                // allowed file types: png, jpeg, pdf 
                quality: "75",              // only used for types png & jpeg
                timeout: 30000              // Timeout that will cancel phantomjs, in milliseconds 
            };
            let filename = "pdf-" + Date.now() + '.pdf';
            pdf.create(request.body.html, options).toFile(path.resolve(__dirname, '../pdfs/' + filename), (err, file) => {
                if (err) {
                    responseJsonHandler(err, null, response);
                } else {
                    responseJsonHandler(null, { name: filename }, response);
                }
            });
        } else {
            responseJsonHandler('html not found!', null, response);
        }
    },
};
