export const ExtendComponent = function() {
    const ANNOTATIONS_KEY = 'annotations';
    const COMPONENT_FILTER = function(annotation) {
        return !!annotation.selector;
    };
    return function(target) {
        // TODO check that target extends
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