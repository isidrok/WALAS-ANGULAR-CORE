export const mixinWithComposition = function(...propsToMix) {
    if (propsToMix[0] && propsToMix.some((prop) => typeof prop !== 'string')) {
        throw new Error('Invalid propsToMix, must be of the type string');
    }
    /**
     * Copies all property definitions to the new constructor
     * and makes all statements called when calling to super() 
     * @param {any} protos 
     * @returns 
     */
    function mixCtors(protos) {
        return function() {
            protos.map((proto) =>
                proto.constructor &&
                Object.assign(this, new proto.constructor)
            );
        };
    }
    /**
     * Mixes all prototypes into the superclass one,
     * defining all methods and properties, if different
     * prototypes have properties with the same name, then
     * the one of the last class passed as argument when
     * using the mixin will remain (except if it is set 
     * for composition)
     * 
     * @param {any} target 
     * @param {any} protos 
     */
    function mixProtos(target, protos) {
        protos.map((proto) =>
            Reflect.ownKeys(proto).map((key) =>
                Reflect.defineProperty(
                    target.prototype,
                    key,
                    Reflect.getOwnPropertyDescriptor(proto, key)
                )
            )
        );
    }
    /**
     * For each property specified in props will create a method 
     * in target with the same name that will call all methods within
     * protos that share said name.
     * 
     * TODO: -> limit it so only methods can be composed (no set/get)
     *       -> refactor using Reflect API
     *       -> find a way to preserve main class context so when calling
     *          super.someMethod() we dont need to pass its scope 
     *  
     * @param {any} target 
     * @param {any} protos 
     * @param {any} props 
     * @returns 
     */
    function composeProps(target, protos, props) {
        if (!props) {
            return;
        }
        props.map((prop) => {
            target.prototype[prop] = function() {
                protos.map((proto) => proto[prop] && proto[prop].call(this));
            };
        });
    }
    /**
     * Function that returns a superclass whose properties are mixed
     * with the ones of the different classes and whose constructor,
     * as well as props passed as arguments (propsToMix) are the 
     * result of composing those methods between all the classes.
     */
    return function(...classes) {
        if (classes.some((clazz) => typeof clazz !== 'function')) {
            throw new Error('Invalid classes, must be of the type function');
        }
        let protos = classes.map((clazz) => clazz.prototype);
        let superclass = mixCtors(protos);
        mixProtos(superclass, protos);
        composeProps(superclass, protos, propsToMix);
        return superclass;
    };
};