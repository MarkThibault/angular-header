export default class AppRoute {
    static $inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
    constructor(
        $locationProvider: ng.ILocationProvider,
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider
    ) {
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
        $urlRouterProvider.when("/", "/User/Dashboard");

        $stateProvider
            .state("user", {
                url: "/User",
                redirectTo: "user.dashboard"
            })
            .state("user.dashboard", {
                url: "/Dashboard",
                parent: "user",
                views: {
                    "@": {
                        template: "User Dashboard Template"
                    }
                }
            });

        $stateProvider
            .state("registrants", {
                url: "/Registrants",
                redirectTo: "registrants.list"
            })
            .state("registrants.list", {
                url: "/List",
                parent: "registrants",
                views: {
                    "@": {
                        template: `Registrants List Template<br><a ui-sref="registrants.registrantDetails({employeeId:'abc123'})" ui-sref-active="active">View Kamala Khan</a>`
                    }
                }
            })
            .state("registrants.registrantDetails", {
                url: "/Details/:employeeId",
                parent: "registrants",
                views: {
                    "@": {
                        template: `Registrant Details Template<br><a ui-sref="registrants.registrantDetails.edit({employeeId:'abc123'})" ui-sref-active="active">Edit Kamala Khan</a>`
                    }
                },
                resolve: {
                    requiredParam: ["$location", "$stateParams", function ($location: ng.ILocationService, $stateParams) {
                        if (!$stateParams.employeeId && !$stateParams.employeeId.length) {
                            $location.path("/Registrants/List");
                        }
                    }]
                }
            })
            .state("registrants.registrantDetails.edit", {
                url: "/Edit",
                parent: "registrants.registrantDetails",
                views: {
                    "@": {
                        template: "<subspace></subspace>"
                    }
                },
                resolve: {
                    requiredParam: ["$location", "$stateParams", function ($location: ng.ILocationService, $stateParams) {
                        if (!$stateParams.employeeId && !$stateParams.employeeId.length) {
                            $location.path("/Registrants/List");
                        }
                    }]
                }
            });

        $stateProvider
            .state("about", {
                url: "/About",
                template: "About Landing Template"
            })
            .state("about.faqs", {
                url: "/Faqs",
                parent: "about",
                views: {
                    "@": {
                        template: "About Faqs Template"
                    }
                }
            })
            .state("about.us", {
                url: "/Us",
                parent: "about",
                views: {
                    "@": {
                        template: "About Us Template"
                    }
                }
            })
            .state("about.releaseNotes", {
                url: "/ReleaseNotes",
                parent: "about",
                views: {
                    "@": {
                        template: "About Release Notes Template"
                    }
                }
            })
            .state("about.tutorials", {
                url: "/Tutorials",
                parent: "about",
                views: {
                    "@": {
                        template: "About Tutorials Template"
                    }
                }
            });

        $stateProvider
            .state("error", {
                url: "/Error",
                template: "This is an error."
            });
        $urlRouterProvider.otherwise("/User/Dashboard");
    }
}