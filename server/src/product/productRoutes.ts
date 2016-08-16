import * as express from 'express';
let router: express.Router = express.Router();

// import controller
import {controller} from "./productController";

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.put('/:id', controller.post);

export {router};