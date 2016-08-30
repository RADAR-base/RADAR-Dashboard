import {Component, NgZone, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {NavigatorComponent} from './navigator.component';
import {PlotComponent} from './plot.component';
import {DemoQuestionnaireComponent} from './demoQuestionnaire.component';
import {MockComponent} from './mock.component';

@Component({
    selector: 'landing',
    templateUrl: "views/landing.component.html",
    directives: [NavigatorComponent, DemoQuestionnaireComponent, MockComponent]
})

export class LandingComponent implements OnInit{
    ngOnInit(){
    }
}
