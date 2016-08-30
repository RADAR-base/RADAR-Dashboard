System.register(['angular2/core', "./demoQuestionnaire.service"], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, demoQuestionnaire_service_1;
    var DemoQuestionnaireComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (demoQuestionnaire_service_1_1) {
                demoQuestionnaire_service_1 = demoQuestionnaire_service_1_1;
            }],
        execute: function() {
            DemoQuestionnaireComponent = (function () {
                function DemoQuestionnaireComponent(demoQ) {
                    this.demoQ = demoQ;
                }
                DemoQuestionnaireComponent.prototype.ngOnInit = function () {
                    this.res = this.demoQ.getResponse();
                };
                DemoQuestionnaireComponent = __decorate([
                    core_1.Component({
                        selector: 'demoQuestionnaire',
                        providers: [demoQuestionnaire_service_1.DemoQuestionnaireService],
                        templateUrl: 'views/demoQuestionnaire.component.html'
                    }), 
                    __metadata('design:paramtypes', [demoQuestionnaire_service_1.DemoQuestionnaireService])
                ], DemoQuestionnaireComponent);
                return DemoQuestionnaireComponent;
            }());
            exports_1("DemoQuestionnaireComponent", DemoQuestionnaireComponent);
        }
    }
});
