System.register(['angular2/core', './navigator.component', './demoQuestionnaire.component', './mock.component'], function(exports_1) {
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
    var core_1, navigator_component_1, demoQuestionnaire_component_1, mock_component_1;
    var LandingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (navigator_component_1_1) {
                navigator_component_1 = navigator_component_1_1;
            },
            function (demoQuestionnaire_component_1_1) {
                demoQuestionnaire_component_1 = demoQuestionnaire_component_1_1;
            },
            function (mock_component_1_1) {
                mock_component_1 = mock_component_1_1;
            }],
        execute: function() {
            LandingComponent = (function () {
                function LandingComponent() {
                }
                LandingComponent.prototype.ngOnInit = function () {
                };
                LandingComponent = __decorate([
                    core_1.Component({
                        selector: 'landing',
                        templateUrl: "views/landing.component.html",
                        directives: [navigator_component_1.NavigatorComponent, demoQuestionnaire_component_1.DemoQuestionnaireComponent, mock_component_1.MockComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LandingComponent);
                return LandingComponent;
            }());
            exports_1("LandingComponent", LandingComponent);
        }
    }
});
