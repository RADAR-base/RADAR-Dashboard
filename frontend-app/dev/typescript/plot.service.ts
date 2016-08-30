import {Injectable} from "angular2/core";
import {RESPONSE} from "./mocksleepdata";

@Injectable()
export class PlotService {
    getResponse(){
        return RESPONSE;
    }
}
