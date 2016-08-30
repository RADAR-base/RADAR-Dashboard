import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {PlotService} from "./plot.service";

@Component({
    selector: 'plot',
    providers: [PlotService],
    templateUrl: 'views/plot.component.html'
})
export class PlotComponent implements OnInit{

    public res;

    constructor(private plotService: PlotService){}

    ngOnInit(){
        this.res = this.plotService.getResponse();
    }
}
