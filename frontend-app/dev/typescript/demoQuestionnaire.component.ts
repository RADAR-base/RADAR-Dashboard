import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {DemoQuestionnaireService} from "./demoQuestionnaire.service";

@Component({
    selector: 'demoQuestionnaire',
    providers: [DemoQuestionnaireService],
    templateUrl: 'views/demoQuestionnaire.component.html'
})
export class DemoQuestionnaireComponent implements OnInit{

    public res;
    public isExtendedView = false;
    private timeSinceExtendedViewClose = 100;
    public questionName = "Null";
    public questionsSubmitted = 2;
    public adverseEvents = 0;
    public status = true;

    constructor(private demoQ: DemoQuestionnaireService){}

    ngOnInit(){
        this.res = this.demoQ.getResponse();
        this.questionName = this.res[0].form
    }

    showExtendedView(){
        var timeT = Date.now() - 100;
        if(this.timeSinceExtendedViewClose < timeT) this.isExtendedView = true;
    }

    closeExtendedView(){
        this.isExtendedView = false;
        this.timeSinceExtendedViewClose = Date.now();
    }

}
