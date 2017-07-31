/**
 * Probe of concept for extending annotations, in this case
 * the @Component annotation will get the parent attributes
 * to complement the ones specified in the child.
 * 
 * TODO: create a unique annotation @Extend that given some parameters
 * would be able to resolve any kind of inheritance.
 */
export const ExtendComponent = function() {
    const ANNOTATIONS_KEY = 'annotations';
    const COMPONENT_FILTER = function(annotation) {
        return !!annotation.selector;
    };
    return function(target) {
        // TODO check that target is extending from a class
        let parent = Object.getPrototypeOf(target.prototype).constructor;
        let parentAnnotations = Reflect.getMetadata(ANNOTATIONS_KEY, parent)
            .filter((c) => COMPONENT_FILTER(c))[0];
        let currentAnnotations = Reflect.getMetadata(ANNOTATIONS_KEY, target)
            .filter((c) => COMPONENT_FILTER(c))[0];
        let mergedAnnotations = Object.assign(
            {},
            parentAnnotations,
            currentAnnotations);
        Object.assign(currentAnnotations, mergedAnnotations);
    };
};