/// <reference path="../../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

import {bootstrap} from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from 'angular2/router';


bootstrap(AppComponent, [ROUTER_PROVIDERS,]);

