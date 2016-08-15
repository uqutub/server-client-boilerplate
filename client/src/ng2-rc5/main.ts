///<reference path="./../../../typings/index.d.ts"/>

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';

platformBrowserDynamic().bootstrapModule(AppModule).then((result) => {
    // console.log('result', result);
    console.log('Bootstrap loaded');
});