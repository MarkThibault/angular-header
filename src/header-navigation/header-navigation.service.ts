import Area from "./header-navigation-area.class";
import Subspace from "./header-navigation-subspace.class";

export default class HeaderNavigationService {
    private areas: Array<Area> = [];
    private subspace: Subspace = null;

    static $inject = ["$location", "$rootScope", "$state"];
    constructor(
        private $location: ng.ILocationService,
        private $rootScope: ng.IRootScopeService,
        private $state: ng.ui.IStateService
    ) {
        this.$rootScope.$on("$stateChangeStart", (event, next, current) => {
            if (this.subspace) {
                this.subspace = null;
                this.$rootScope.$broadcast("updateNavigationSubspace", this.subspace);
            }
        });
    }

    addArea(newArea: Area) {
        if (newArea.hasPermission) {
            this.areas.push(newArea);
            this.$rootScope.$broadcast("updateNavigationAreas", this.areas);
        }
    }

    getAreas() {
        return this.areas;
    }

    getSubspace() {
        return this.subspace;
    }

    setSubspace(newSubspace: Subspace) {
        this.subspace = newSubspace;
        this.$rootScope.$broadcast("updateNavigationSubspace", this.subspace);
    }
}