require("./app.component.scss");
require("./favicon.png");

import * as angular from "angular";
import "../../dist/angular-header";

import AppService from "./app.service";
import AppComponent from "./app.component";
import SubspaceComponent from "./subspace.component";
import AppRoute from "./app.route";
import AppNavigation from "./app.navigation";

angular
    .module("app", ["angularHeaderModule"])
    .config(AppRoute)
    .service("appService", AppService)
    .component("app", new AppComponent())
    .component("subspace", new SubspaceComponent())
    .run(AppNavigation);