export const getPathToModule = function(moduleName) {
    return `app/src/modules/${moduleName}/dist/${moduleName}.js`;
};
export const firstToUpper = function(str) {
    return str[0].toUpperCase() + str.substring(1);
};
export const parseModuleName = function(moduleName) {
    return `${firstToUpper(moduleName)}Module`;
};
export const getChildrenPath = function(moduleName) {
    return `${getPathToModule(moduleName)}#${parseModuleName(moduleName)}`;
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