import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/app/app';

@NgModule({
  imports:      [ BrowserModule ]
  ,declarations: [ AppComponent ]
  ,bootstrap:    [ AppComponent ]
//   ,providers: []
})
export class AppModule { }