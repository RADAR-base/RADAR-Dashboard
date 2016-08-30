import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'navigator',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "views/navigator.component.html"
})
export class NavigatorComponent {

    public isActive = false;

    setToActive(){
        this.isActive = !this.isActive;
    }

}
