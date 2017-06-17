import HeaderNavigationWorkspace from "./header-navigation-workspace.class";

export default class HeaderNavigationArea {
    areaName: string;
    clickEvent: Function;
    disabled?: boolean | Function;
    displayInDropdown?: boolean | Function;
    hasPermission?: boolean | Function;
    inCurrentState: Function;
    label?: string;
    workspaces?: Array<HeaderNavigationWorkspace>;
}