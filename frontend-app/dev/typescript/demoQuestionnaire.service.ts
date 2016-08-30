import {Injectable} from "angular2/core";
import {RESPONSE} from "./mock-questionnaireData";

@Injectable()
export class DemoQuestionnaireService {
    getResponse(){
        return RESPONSE;
    }
}
