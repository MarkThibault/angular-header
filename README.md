# Angular Header

This is a header component that includes a title, navigation, and user name sections. 

## Getting Started

### Prerequisites

It is suggested to have "angular-animate" installed.

### Installing

Add the following to your dependencies:
```
"angular-header": "git://github.com/MarkThibault/angular-header.git",
```

### Usage

#### Inject into angular module:
```
angular
    .module("app", ["angularHeader"])
```

#### Using the components:
```
<angular-header show="app.isAuthenticated">
    <angular-header-title>
        <img class="HeaderTitle-img" src="http://placehold.it/350x100?text=Logo" alt="" />
        Header Text
    </angular-header-title>
    <angular-header-navigation></angular-header-navigation>
    <angular-header-account sign-out="app.signOut" user-name="app.userName"></angular-header-account>
</angular-header>
```

#### Using the navigation service:
##### Create a navigation file lives near routes
```
import * as angularHeader from "angular-header";

export default class RegistrantAreaNavigation {
    static $inject = ["$state", "angularHeaderNavigationService"];
    constructor(
        $state: ng.ui.IStateService,
        angularHeaderNavigationService: angularHeader.NavigationService
    ) {
    let registrantArea: angularHeader.NavigationArea = {
            areaName: "Registrants",
            clickEvent: () => {
                return $state.go("registrants.list");
            },
            displayInDropdown: true,
            hasPermission: true,
            inCurrentState: () => { return $state.includes("registrants"); },
            workspaces: [{
                hasPermission: true,
                workspaceName: "List",
                displayInDropdown: true,
                clickEvent: () => {
                    return $state.go("registrants.list");
                },
                inCurrentState: () => { return $state.includes("registrants.list"); }
            }, {
                hasPermission: true,
                displayInDropdown: false,
                workspaceName: "Details",
                clickEvent: () => {
                    return $state.go("registrants.registrantDetails");
                },
                inCurrentState: () => { return $state.includes("registrants.registrantDetails", { employeeId: "abc123" }); }
            }]
        };
        angularHeaderNavigationService.addArea(registrantArea);
    }
}
```

##### Subspaces are decleared in view's Controllers or components
```
import * as angularHeader from "angular-header";
export default class EditRegistrantComponent implements ng.IComponentOptions {
    bindings: any;
    controller: any;
    controllerAs: string;
    template: string;
    transclude: boolean;

    constructor() {
        this.bindings = {};
        this.transclude = true;
        this.controller = EditRegistrantController;
        this.controllerAs = "app";
        this.template = "This is a subspace";
    }
}

export class EditRegistrantController {
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
```

## Running the tests


## Deployment



## Built With


## Contributing

## Versioning

## Authors

## License

## Acknowledgments
