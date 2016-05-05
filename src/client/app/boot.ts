/// <reference path="../../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';


bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);

