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
        this._isInitialized = false;
    }
    get isInitialized() {return this._isInitialized;}

    checkIsInitialized(errorMsg) {
        const defaultErrorMsg =
            'The configuration service must be initialized before declaring the main module.'
        if (!this._isInitialized) {
            throw new Error(errorMsg || defaultErrorMsg);
        }
    }
    init(customConfig) {
        /**
         * Merge the previously initialized default
         * properties with the ones specified by the
         * user, then call init method of all the 
         * mixed classes.
         */
        this._mergeConfig(customConfig);
        // need to call with actual scope due to the mixin implementation.
        super.init.call(this);
        this._isInitialized = true;
    }
    _mergeConfig(config) {
        /**
         * Config will have a format like: 
         *  
         *  {
         *      i18n: {
         *          useI18n: true
         *      },
         *      validation: {
         *          validationLibrary: validatorjs
         *      }
         *  }
         *
         * in order to access the configuration properties
         * directly we need to normalize the object first
         * so that we end up with:
         * 
         *  {
         *      useI18n: true,
         *      validationLibrary: validatorjs
         *  } 
         * 
         * The first format is more confortable for the user while
         * the second one is easier to work with.
         */
        let normalizedConfig = {};
        Object.values(config).map((item) =>
            Object.assign(normalizedConfig, item)
        );
        Object.assign(this, normalizedConfig);
    }
}
export const configService = new ConfigService();