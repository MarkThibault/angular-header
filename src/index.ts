import * as angular from "angular";

import HeaderComponent from "./header.component";
import HeaderAccountComponent from "./header-account/header-account.component";
import HeaderTitleComponent from "./header-title/header-title.component";
import HeaderNavigationComponent from "./header-navigation/header-navigation.component";
import HeaderNavigationService from "./header-navigation/header-navigation.service";

angular.module("angularHeaderModule", [
    "ngAnimate",
    "ui.router",
    "ui.router.redirect"
    ])
    .config(["$stateProvider", ($stateProvider) => { }])
    .service("angularHeaderNavigationService", HeaderNavigationService)
    .component("angularHeader", new HeaderComponent())
    .component("angularHeaderAccount", new HeaderAccountComponent())
    .component("angularHeaderTitle", new HeaderTitleComponent())
    .component("angularHeaderNavigation", new HeaderNavigationComponent())
    .name;