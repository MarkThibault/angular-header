// Type definitions for Angular Header

export as namespace angularHeader;

export = angularHeader;

declare namespace angularHeader {
    interface NavigationArea {
        areaName: string;
        clickEvent: Function;
        disabled?: boolean | Function;
        displayInDropdown?: boolean | Function;
        hasPermission?: boolean | Function;
        inCurrentState: Function;
        label?: string;
        workspaces?: Array<NavigationWorkspace>;
    }

    interface NavigationWorkspace {
        clickEvent: Function;
        disabled?: boolean | Function;
        displayInDropdown?: boolean | Function;
        hasPermission?: boolean | Function;
        inCurrentState: Function;
        label?: string;
        workspaceName: string;
    }

    interface NavigationSubspace {
        label?: string;
        subspaceName: string;
    }

    interface NavigationService {
        addArea(newArea: NavigationArea);
        getAreas(): Array<NavigationArea>;
        getSubspace(): NavigationSubspace;
        setSubspace(newSubspace: NavigationSubspace);
    }
}