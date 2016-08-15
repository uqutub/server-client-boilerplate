///<reference path="../../typings/index.d.ts" />

"use strict";

import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';

export class Application {
    private app;
    private httpServer;
    private address: { port: number, host: string } = { port: 0, host: null };
    private host: string;
    private enviroment: string = 'dev';

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
    }

    public setPort(port: number = 3000) {
        this.address.port = process.env.PORT || port;
    }

    public staticPath() {
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
        
        this.renderAngularPage(angularRoutes)
    }

    public bodyParser() {
        // this.app.use(bodyParser.urlencoded({limit: '1mb', extended: true, parameterLimit: 10000})); // parse application/x-www-form-urlencoded (to support URL-encoded bodies)
        this.app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));	// Using bodyparser for getting post request variables (to support application/JSON-encoded bodies)
    }

    public logger() {
        this.app.use(logger(this.enviroment));
    }

    public customLogger() {
        //logger middle ware
        this.app.use((req, res, next) => {
            console.log('Logging: ' + req.method.toString() + ': ' + req.url.toString());
            next();
        });
    }

    public mongooseConnect(connection: string = 'mongodb://localhost:27017/demoDB') {
        mongoose.connect(connection);
    }

    public errorHandler() {
        /// catch 404 and forwarding to error handler
        this.app.use((req, res, next) => {
            var err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (this.enviroment === 'dev') {
            // development error handler will print stacktrace
            this.app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.send('error', {
                    message: err.message,
                    error: err
                });
            });
        } else {
            // production error handler no stacktraces leaked to user
            this.app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.send('error', {
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
        res.send('Hellow World from Express');
        // res.sendFile(path.resolve(__dirname, 'index.html'));
    }

    private renderAngularPage(routes) {
        this.app.use(routes, (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(__dirname, '../../client/build/index.html'));
        });
    }

    public routes() {
        // this.app.use('/api/user', userRoutes);
    }

    public startServerListing() {
        this.httpServer.listen(this.address.port, (r) => {
            // this.address = this.httpServer.address();
            this.address.port = this.httpServer.address().port;
            this.address.host = this.httpServer.address().address;
            console.log('server is running on http://localhost:' + this.address.port + '/');
        });
    }

    public startServer() {
        this.setPort();
        this.logger();
        // this.customLogger();
        // this.mongooseConnect();
        this.bodyParser();
        this.staticPath();
        this.forAngularApp();
        // this.indexRoute();
        this.routes();
        this.errorHandler();
        this.startServerListing();
    }


}



