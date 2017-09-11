import {i18nDefaults} from './i18ndefaults';
export class I18nConfig {
    constructor() {
        Object.assign(this, i18nDefaults);
    }
    
    get useI18n() {return this._useI18n;}
    set useI18n(value) {this._useI18n = value;}

    get i18nLibrary() {return this._i18nLibrary;}
    set i18nLibrary(value) {this._i18nLibrary = value;}
}