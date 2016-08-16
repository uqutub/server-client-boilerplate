///<reference path="../../typings/index.d.ts" />

"use strict";

import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import {devCredentials, prodCredentials} from './credentials';

import {router as customerRoutes} from './customer';
import {router as productRoutes} from './product';

export class Application {
    private app;
    private httpServer: http.Server;
    private address: { port: number, host: string } = { port: 0, host: null };
    private env: string; // enviroment 'dev' || 'prod' 
    private mongoDbConStr: string;

    constructor(env: string = 'dev') {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.env = env;
    }

    private enviroment() {
        if (this.env === 'dev') {
            this.mongoDbConStr = `mongodb://${devCredentials.mongolab.user}:${devCredentials.mongolab.password}@ds161245.mlab.com:61245/${devCredentials.mongolab.db}`;
        } else if (this.env === 'prod') {
            this.mongoDbConStr = `mongodb://${prodCredentials.mongolab.user}:${prodCredentials.mongolab.password}@ds161245.mlab.com:61245/${prodCredentials.mongolab.db}`;
        }
    }

    public setPort(port: number = 3000) {
        this.address.port = process.env.PORT || port;
    }

    private staticPath() {
        // defining static path for current project
        this.app.use(express.static(path.join(__dirname, '../../client/build')));
        // this.app.use('/app', express.static(path.resolve(__dirname, 'app')));
        // this.app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
    }

    public forAngularApp() {
        let angularRoutes = [
            "/home",
            "/customers"
        ];

        this.renderAngularPage(angularRoutes);
    }

    private bodyParser() {
        // this.app.use(bodyParser.urlencoded({limit: '1mb', extended: true, parameterLimit: 10000})); // parse application/x-www-form-urlencoded (to support URL-encoded bodies)
        this.app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));	// Using bodyparser for getting post request variables (to support application/JSON-encoded bodies)
    }

    private logger() {
        this.app.use(logger(this.env));
    }

    private customLogger() {
        //logger middle ware
        this.app.use((req, res, next) => {
            console.log('Logging: ' + req.method.toString() + ': ' + req.url.toString());
            next();
        });
    }

    public mongooseConnect() {
        mongoose.connect(this.mongoDbConStr);
    }

    private errorHandler() {
        /// catch 404 and forwarding to error handler
        this.app.use((req, res, next) => {
            var err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (this.env === 'dev') {
            // development error handler will print stacktrace
            this.app.use((err, req, res, next) => {
                res.status(err.status || 500).send({
                    message: err.message,
                    error: err
                });
            });
        } else {
            // production error handler no stacktraces leaked to user
            this.app.use((err, req, res, next) => {
               res.status(err.status || 500).send({
                    message: err.message,
                    error: {}
                });
            });
        }
    }

    public indexRoute() {
        /* GET home page. */
        this.app.get('/', this.renderIndex);
    }

    private renderIndex(req: express.Request, res: express.Response) {
        res.status(200).send('Hellow World from Express');
        // res.sendFile(path.resolve(__dirname, 'index.html'));
    }

    private renderAngularPage(routes) {
        this.app.use(routes, (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(__dirname, '../../client/build/index.html'));
        });
    }

    public routes() {
        // REST APIs
        this.app.use('/api/customer', customerRoutes);
        this.app.use('/api/product', productRoutes);
    }

    private startServerListing() {
        this.httpServer.listen(this.address.port, (r) => {
            // this.address = this.httpServer.address();
            this.address.port = this.httpServer.address().port;
            this.address.host = this.httpServer.address().address;
            console.log('server is running on http://localhost:' + this.address.port + '/');
        });
    }

    public startServer() {
        this.enviroment();
        this.setPort();
        this.logger();
        // this.customLogger();
        this.mongooseConnect();
        this.bodyParser();
        this.staticPath();
        this.forAngularApp();
        // this.indexRoute();
        this.routes();
        this.errorHandler();
        this.startServerListing();
    }


}



