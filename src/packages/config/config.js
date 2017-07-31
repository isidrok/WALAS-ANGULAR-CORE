import {
    I18nConfig, LoaderConfig, ValidationConfig,
    defaultConfig
} from './configs';
class ConfigService {
    constructor() {
        this._config = defaultConfig;
    }
    get config() {
        return this._config;
    }
    init(customConfig) {
        this.mergeConfigs(customConfig);
    }
    mergeConfigs(customConfig) {
        this._config = {...(this._config), ...customConfig};
    }
}
export const configService = new ConfigService();