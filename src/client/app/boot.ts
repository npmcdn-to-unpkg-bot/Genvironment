import {bootstrap} from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from 'angular2/router';
import {UserInformation} from './index'


bootstrap(AppComponent, [ROUTER_PROVIDERS,]);