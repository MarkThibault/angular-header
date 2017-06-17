import * as angular from "angular";
import NavigationService from "./header-navigation.service";
import Area from "./header-navigation-area.class";
import Workspace from "./header-navigation-workspace.class";
import Subspace from "./header-navigation-subspace.class";

export default class HeaderNavigationComponent implements ng.IComponentOptions {
    bindings: any;
    controller: ng.IControllerConstructor;
    controllerAs: string;
    templateUrl: string;
    transclude: boolean;

    constructor() {
        this.bindings = {};
        this.transclude = true;
        this.controller = HeaderNavigationController;
        this.controllerAs = "navigation";
        this.templateUrl = require("./header-navigation.component.html");
    }
}

export class HeaderNavigationController {
    areas: Array<Area>;
    arrowIcon = this.$sce.trustAsHtml(require("./arrow-icon.svg"));
    showAreaDropdown: boolean = false;
    showWorkspaceDropdown: boolean = false;
    subspace: any;

    static $inject = ["$document", "$rootScope", "$sce", "$scope", "angularHeaderNavigationService"];
    constructor(
        private $document: ng.IDocumentService,
        private $rootScope: ng.IRootScopeService,
        private $sce: ng.ISCEService,
        private $scope: ng.IScope,
        private angularHeaderNavigationService: NavigationService
    ) {
        this.areas = this.angularHeaderNavigationService.getAreas();
        this.$rootScope.$on("updateNavigationAreas", (event, area: Array<Area>) => {
            this.areas = area;
        });

        this.$rootScope.$on("updateNavigationSubspace", (event, subspace) => {
            this.subspace = subspace;
        });
    }

    hasAreasToShowInDropdown() {
        let shouldShow = false;
        for (let i = 0; i < this.areas.length; i++) {
            if (this.showAreaInDropdown(this.areas[i]) && !this.areas[i].inCurrentState()) {
                shouldShow = true;
                break;
            }
        }
        return shouldShow;
    }

    showAreaInDropdown(area: Area) {
        let show = area.displayInDropdown && area.hasPermission;
        return show;
    }

    showDefaultArea() {
        let shouldShow = true;
        if (this.areas.length) {
            for (let i = 0; i < this.areas.length; i++) {
                if (this.areas[i].inCurrentState()) {
                    shouldShow = false;
                    break;
                }
            }
        }
        else {
            shouldShow = false;
        }
        return shouldShow;
    }

    showDefaultAreaWorkspace(area: Area) {
        let shouldShow = true;
        if (area.workspaces.length) {
            for (let i = 0; i < area.workspaces.length; i++) {
                if (area.workspaces[i].inCurrentState()) {
                    shouldShow = false;
                    break;
                }
            }
        }
        else {
            shouldShow = false;
        }
        return shouldShow;
    }

    showSingleWorkspaceButton(area: Area) {
        let shouldShowSingle = true;
        let count = 0;
        for (let i = 0; i < area.workspaces.length; i++) {
            if (this.showWorkspaceInDropdown(area.workspaces[i])) {
                count = count + 1;
                if (count >= 1 && !area.workspaces[i].inCurrentState()) {
                    shouldShowSingle = false;
                    break
                }
            }
        }
        return shouldShowSingle;
    }

    showWorkspaceButton(area: Area) {
        return area.inCurrentState() && area.workspaces.length;
    }

    showWorkspaceInDropdown(workspace: Workspace) {
        return workspace.displayInDropdown && workspace.hasPermission;;
    }

    toggleAreaDropdown() {
        if (this.hasAreasToShowInDropdown()) {
            this.toggleDropdown("showAreaDropdown");
        }
    }

    toggleWorkspaceDropdown(area) {
        this.toggleDropdown("showWorkspaceDropdown");
    }

    private toggleDropdown(toggle: string) {
        let firstClick = false;
        let documentClick = () => {
            if (firstClick) {
                this[toggle] = false;
                this.$scope.$apply();
                this.$document.off("click", documentClick);
                firstClick = false;
            } else {
                firstClick = true;
            }
        };

        if (this[toggle]) {
            this[toggle] = false;
            this.$document.off("click", documentClick);
        } else {
            this[toggle] = true;
            this.$document.on("click", documentClick);
        }
    }
}