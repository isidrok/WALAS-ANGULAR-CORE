import {
    I18nConfig, LoaderConfig, ValidationConfig
} from './configs';
import {configMixin} from './configmixin';
class ConfigService extends configMixin(
    I18nConfig,
    LoaderConfig,
    ValidationConfig) {
    constructor() {
        /**
         * Initialize default configs of the
         * different configuration services
         * that are specified in the mixin
         */
        super();
    }
    init(customConfig) {
        /**
         * Merge the previously initialized default
         * properties with the ones specified by the
         * user, then call init method of all the 
         * mixed classes.
         */
        this._mergeConfig(customConfig);
        super.init();
    }
    _mergeConfig(config) {
        Object.assign(this, config);
    }
}
export const configService = new ConfigService();