export const getPathToModule = function(moduleName) {
    // TODO: solve this.
    return `app/src/modules/${moduleName}/dist/${moduleName}.js`;
};
export const getChildrenPath = function(moduleName) {
    return `${getPathToModule(moduleName)}#${(moduleName)}`;
};
export const resolveRoutes = function() {
    return Object.keys(window.routes)
        .map((routeKey) => {
            let route = window.routes[routeKey];
            return {
                path: route.path,
                loadChildren: getChildrenPath(routeKey)
            };
        });
};
export const composeRoutes = function(...args) {
    return [...resolveRoutes(), ...args];
};

/**
 * We need to return an object with the form:
 *  {
 *      path,
 *      loadChildren
 *  }
 * path must be the url to the lazy loaded module
 * and loadChildren needs to be an object in the lines of:
 *  {
 *      path: where do we get the module from ??
 *      moduleName,
 *      dependencies: [dependencies that need to be lazy loaded] ??
 *  }
 * 
 * NEEDS SPPECIFICATION
 */