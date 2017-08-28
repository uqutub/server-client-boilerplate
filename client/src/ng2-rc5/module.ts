import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './components/app/app';   //bootstrap component

import { AppRoutes, ApplicationComponents } from './routes';       // application components

import { HttpService, HandleStore } from './services/index'; // application services

// import { ApplicationPipes } from './pipes/index';       // application pipes


@NgModule({
  imports: [  // imports
    BrowserModule
    , RouterModule.forRoot(AppRoutes)
    , FormsModule
    , HttpModule
  ]
  , declarations: [ // declarations
    AppComponent
    , ...ApplicationComponents
  ]
  , bootstrap: [  // bootstrap
    AppComponent
  ]
  , providers: [  // providers
    HttpService
    , HandleStore
  ]
})
export class AppModule { }