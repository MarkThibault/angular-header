import * as angularHeader from "../../src/index.d";
export default class SubspaceComponent implements ng.IComponentOptions {
    bindings: any;
    controller: any;
    controllerAs: string;
    template: string;
    transclude: boolean;

    constructor() {
        this.bindings = {};
        this.transclude = true;
        this.controller = SubspaceController;
        this.controllerAs = "app";
        this.template = "This is a subspace";
    }
}

export class SubspaceController {
    static $inject = ["angularHeaderNavigationService"];
    constructor(
        private angularHeaderNavigationService: angularHeader.NavigationService
    ) {
        let subspace: angularHeader.NavigationSubspace = {
            subspaceName: "Edit Kamala Khan"
        };
        this.angularHeaderNavigationService.setSubspace(subspace);
    }
}