import * as angularHeader from "../../src/index.d";

export default class AppNavigation {
    static $inject = ["$state", "angularHeaderNavigationService"];
    constructor(
        $state: ng.ui.IStateService,
        angularHeaderNavigationService: angularHeader.NavigationService
    ) {
        let dashboardArea: angularHeader.NavigationArea = {
            areaName: "User",
            clickEvent: () => {
                return $state.go("user.dashboard");
            },
            displayInDropdown: true,
            hasPermission: true,
            inCurrentState: () => { return $state.includes("user"); },
            workspaces: [{
                hasPermission: true,
                workspaceName: "Dashboard",
                displayInDropdown: true,
                clickEvent: () => {
                    return $state.go("user.dashboard");
                },
                inCurrentState: () => { return $state.includes("user.dashboard"); }
            }]
        };
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
                displayInDropdown: true,
                workspaceName: "Details",
                clickEvent: () => {
                    return $state.go("registrants.registrantDetails");
                },
                inCurrentState: () => { return $state.includes("registrants.registrantDetails", { employeeId: "abc123" }); }
            }]
        };
        let aboutArea: angularHeader.NavigationArea = {
            areaName: "About",
            clickEvent: () => {
                return $state.go("about");
            },
            displayInDropdown: true,
            hasPermission: true,
            inCurrentState: () => { return $state.includes("about"); },
            workspaces: [{
                hasPermission: true,
                workspaceName: "Us",
                displayInDropdown: true,
                clickEvent: () => {
                    return $state.go("about.us");
                },
                inCurrentState: () => { return $state.includes("about.us"); }
            }, {
                hasPermission: true,
                workspaceName: "Faqs",
                displayInDropdown: true,
                clickEvent: () => {
                    return $state.go("about.faqs");
                },
                inCurrentState: () => { return $state.includes("about.faqs"); }
            }, {
                hasPermission: true,
                workspaceName: "Release Notes",
                displayInDropdown: true,
                clickEvent: () => {
                    return $state.go("about.releaseNotes");
                },
                inCurrentState: () => { return $state.includes("about.releaseNotes"); }
            }, {
                hasPermission: true,
                workspaceName: "Tutorials",
                displayInDropdown: true,
                clickEvent: () => {
                    return $state.go("about.tutorials");
                },
                inCurrentState: () => { return $state.includes("about.tutorials"); }
            }]
        };
        let errorArea: angularHeader.NavigationArea = {
            areaName: "Error",
            clickEvent: () => {
                return $state.go("error");
            },
            displayInDropdown: false,
            hasPermission: true,
            inCurrentState: () => { return $state.includes("error"); },
            workspaces: []
        };
        angularHeaderNavigationService.addArea(dashboardArea);
        angularHeaderNavigationService.addArea(registrantArea);
        angularHeaderNavigationService.addArea(aboutArea);
        angularHeaderNavigationService.addArea(errorArea);
    }
}