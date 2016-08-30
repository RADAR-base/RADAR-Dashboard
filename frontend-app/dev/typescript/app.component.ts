import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {LandingComponent} from './landing.component';

@Component({
    selector: 'app'
})
@View({
    templateUrl: 'views/app.component.html',
    directives:[ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path:'/', name:'Landing', component:LandingComponent, useAsDefault:true}
])
export class AppComponent {

}
