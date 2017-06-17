const template = require("./app.component.html");
import AppService from "./app.service";

export default class AppComponent implements ng.IComponentOptions {
    bindings: any;
    controller: any;
    controllerAs: string;
    templateUrl: string;
    transclude: boolean;

    constructor() {
        this.bindings = {};
        this.transclude = true;
        this.controller = AppController;
        this.controllerAs = "app";
        this.templateUrl = template;
    }
}

export class AppController {
    isAuthenticated: boolean = true;
    userName: string;

    static $inject = ["$state", "$timeout", "appService"];
    constructor(
        private $state: ng.ui.IStateService,
        private $timeout: ng.ITimeoutService,
        private appService: AppService
    ) {
        this.appService.getUser().then( data => {
            $timeout(()=>{
                this.userName = data.resolve();
            }, 300)
        });
    }

    goToParent() {
        if (this.$state.current.parent) {
            this.$state.go("^");
        }
    }

    signOut(event) {
        this.appService.signOut();
    };
}