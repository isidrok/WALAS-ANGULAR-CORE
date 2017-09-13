

export const resolveRoutes = function(routes) {
    return routes.map((routeObject) =>
        ({
            path: routeObject.route,
            loadChildren: JSON.stringify(routeObject)
        }));
};
