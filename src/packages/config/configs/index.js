import {I18nConfig, i18nDefaults} from './i18n';
import {LoaderConfig, loaderDefaults} from './loader';
import {ValidationConfig, validationDefaults} from './validation';

export default {
    I18nConfig,
    LoaderConfig,
    ValidationConfig,
    defaultConfig: mergeDefaults()
};

function mergeDefaults() {
    return {
        ...i18nDefaults,
        ...loaderDefaults,
        ...validationDefaults
    };
}