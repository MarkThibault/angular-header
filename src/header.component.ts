export default class HeaderComponent implements ng.IComponentOptions {
    bindings: any;
    controller: any;
    controllerAs: string;
    templateUrl: string;
    transclude: boolean;

    constructor() {
        this.bindings = {
            show: "="
        };
        this.transclude = true;
        this.controller = HeaderController;
        this.templateUrl = require("./header.component.html");
    }
}

export class HeaderController {
    show: boolean;

    static $inject = [];
    constructor() {
    }
}