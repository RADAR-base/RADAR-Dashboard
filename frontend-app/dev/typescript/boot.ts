import {bootstrap} from 'angular2/platform/browser';
import {bind} from 'angular2/core';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS, LocationStrategy, Location, HashLocationStrategy} from 'angular2/router'

//noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [
                    ROUTER_PROVIDERS
                    ]);
