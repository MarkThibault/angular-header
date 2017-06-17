export default class HeaderTitleComponent implements ng.IComponentOptions {
    bindings: any;
    controller: any;
    controllerAs: string;
    templateUrl: string;
    transclude: boolean;

    constructor() {
        this.bindings = {};
        this.transclude = true;
        this.controller = HeaderTitleController;
        this.templateUrl = require("./header-title.component.html");
    }
}

export class HeaderTitleController {
    static $inject = [];
    constructor(
    ) {
    }
}