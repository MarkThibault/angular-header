export default class HeaderAccountComponent implements ng.IComponentOptions {
    bindings: any;
    controller: any;
    controllerAs: string;
    templateUrl: string;
    transclude: boolean;

    constructor() {
        this.bindings = {
            onSignOut: "&",
            userName: "<"
        };
        this.transclude = true;
        this.controller = HeaderAccountController;
        this.templateUrl = require("./header-account.component.html");
    }
}

export class HeaderAccountController {
    onSignOut: Function;
    userIcon: any = this.$sce.trustAsHtml(require("./user-icon.svg"));

    static $inject = ["$sce"];
    constructor(
        private $sce: ng.ISCEService
    ) {
    }

    signOut() {
        this.onSignOut();
    }
}