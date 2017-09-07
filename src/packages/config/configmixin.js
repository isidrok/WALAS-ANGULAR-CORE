import {mixinWithComposition} from '../../utils';

/**
 * Creates a mixin that will compose the method init() of
 * the classes passed as a parameter.
 */
const propsToCompose = ['init'];
export const configMixin = mixinWithComposition(...propsToCompose);