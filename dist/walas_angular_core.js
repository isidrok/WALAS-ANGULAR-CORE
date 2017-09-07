(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@walas/angular-vendor-browser'), require('@walas/angular-vendor')) :
	typeof define === 'function' && define.amd ? define(['exports', '@walas/angular-vendor-browser', '@walas/angular-vendor'], factory) :
	(factory((global.WALAS = global.WALAS || {}, global.WALAS.walasAngularCore = global.WALAS.walasAngularCore || {}),global.WALAS.walasAngularVendorBrowser,global.WALAS.walasAngularVendor));
}(this, (function (exports,_walas_angularVendorBrowser,_walas_angularVendor) { 'use strict';

/**
 * Probe of concept for extending annotations, in this case
 * the @Component annotation will get the parent attributes
 * to complement the ones specified in the child.
 * 
 * TODO: create a unique annotation @Extend that given some parameters
 * would be able to resolve any kind of inheritance.
 */
var ExtendComponent = function ExtendComponent() {
    var ANNOTATIONS_KEY = 'annotations';
    var COMPONENT_FILTER = function COMPONENT_FILTER(annotation) {
        return !!annotation.selector;
    };
    return function (target) {
        // TODO check that target is extending from a class
        var parent = Object.getPrototypeOf(target.prototype).constructor;
        var parentAnnotations = Reflect.getMetadata(ANNOTATIONS_KEY, parent).filter(function (c) {
            return COMPONENT_FILTER(c);
        })[0];
        var currentAnnotations = Reflect.getMetadata(ANNOTATIONS_KEY, target).filter(function (c) {
            return COMPONENT_FILTER(c);
        })[0];
        var mergedAnnotations = Object.assign({}, parentAnnotations, currentAnnotations);
        Object.assign(currentAnnotations, mergedAnnotations);
    };
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var _dec$2;
var _class$2;

/**
 * Adds form controls to a form so Angular can
 * validate it, used when there is no ngModel
 * in the input element.
 * Must be scoped to angular AFForm component. 
 * 
 * @export
 * @class FormService
 */

var FormService = (_dec$2 = _walas_angularVendor.Injectable(), _dec$2(_class$2 = function () {
    function FormService() {
        classCallCheck(this, FormService);

        this._form = null;
        this._controls = [];
    }

    createClass(FormService, [{
        key: 'addControl',
        value: function addControl(control, controlName) {
            control && controlName && this._controls.push(_extends({}, control, {
                controlName: controlName
            }));
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._controls = [];
            this._form = null;
        }
    }, {
        key: 'form',
        set: function set$$1(value) {
            var _this = this;

            this._form = value;
            /**
            * Since form inner elements render before the form itself
            * controls will be added beforehand, therefore we can
            * add the controls when setting the form.
            */
            this._form && this._controls.forEach(function (c) {
                return _this._form.addControl(c);
            });
        }
    }]);
    return FormService;
}()) || _class$2);

var html = "<form #frm=\"ngForm\">\n    <ng-content></ng-content>\n</form>";

var _dec$1;
var _dec2;
var _class$1;
var _class2;
var _descriptor;

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * Wrapper for the <form> element, we need this in
 * order to programatically add form controls through
 * the FormService when not using the directive ngModel.
 * 
 * @export
 * @class AfForm
 */

var AfForm = (_dec$1 = _walas_angularVendor.Component({
    selector: 'af-form',
    template: html,
    providers: [FormService]
}), _dec2 = _walas_angularVendor.ViewChild('frm'), _dec$1(_class$1 = (_class2 = function () {
    function AfForm(formService) {
        classCallCheck(this, AfForm);

        _initDefineProp(this, 'form', _descriptor, this);

        this._formService = formService;
    }

    createClass(AfForm, [{
        key: 'ngAfterViewInit',
        value: function ngAfterViewInit() {
            this._formService.form = this.form;
        }
    }, {
        key: 'ngOnDestroy',
        value: function ngOnDestroy() {
            this._formService.dispose();
        }
        /**
         * TODO: 
         *  -> Add utility methods, such as isValid() to interact
         *     with the inner form.
         *  -> Submit system.
         */

    }]);
    return AfForm;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'form', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return this.form;
    }
})), _class2)) || _class$1);
Reflect.defineMetadata('design:paramtypes', [FormService], AfForm);

var i18nDefaults = {
    useI18n: true,
    i18nLibrary: 'i18next'
};

var I18nConfig = function I18nConfig() {
    classCallCheck(this, I18nConfig);

    Object.assign(this, i18nDefaults);
};

var namespace = "WALAS";

var loaderDefaults = {
    namespace: namespace
};

var LoaderConfig = function () {
    function LoaderConfig() {
        classCallCheck(this, LoaderConfig);

        Object.assign(this, loaderDefaults);
    }

    createClass(LoaderConfig, [{
        key: 'namespace',
        get: function get$$1() {
            return this._namespace;
        },
        set: function set$$1(value) {
            this._namespace = value;
        }
    }]);
    return LoaderConfig;
}();

var validationDefaults = {
    modelKeyword: '$model',
    validatorLibray: {},
    customValidators: {},
    validators: {},
    validations: {}
};

var ValidationConfig = function () {
    function ValidationConfig() {
        classCallCheck(this, ValidationConfig);

        Object.assign(this, validationDefaults);
    }

    createClass(ValidationConfig, [{
        key: 'init',
        value: function init() {
            this._mergeValidators();
        }
    }, {
        key: '_mergeValidators',
        value: function _mergeValidators() {
            this.validators = _extends({}, this.customValidators, this.validatorsLibrary);
        }
    }, {
        key: 'addValidators',
        value: function addValidators() {
            // TODO
        }
    }, {
        key: 'addValidations',
        value: function addValidations() {
            // TODO
        }
    }, {
        key: 'validations',
        get: function get$$1() {
            return this._validations;
        },
        set: function set$$1(value) {
            this._validations = value;
        }
    }, {
        key: 'validators',
        get: function get$$1() {
            return this._validators;
        },
        set: function set$$1(value) {
            this._validators = value;
        }
    }, {
        key: 'modelKeyword',
        get: function get$$1() {
            return this._modelKeyword;
        },
        set: function set$$1(value) {
            this._modelKeyword = value;
        }
    }]);
    return ValidationConfig;
}();

var mixinWithComposition = function mixinWithComposition() {
    for (var _len = arguments.length, propsToMix = Array(_len), _key = 0; _key < _len; _key++) {
        propsToMix[_key] = arguments[_key];
    }

    if (propsToMix[0] && propsToMix.some(function (prop) {
        return typeof prop !== 'string';
    })) {
        throw new Error('Invalid propsToMix, must be of the type string');
    }
    /**
     * Copies all property definitions to the new constructor
     * and makes all statements called when calling to super() 
     * @param {any} protos 
     * @returns 
     */
    function mixCtors(protos) {
        return function () {
            var _this = this;

            protos.map(function (proto) {
                return proto.constructor && Object.assign(_this, new proto.constructor());
            });
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
        protos.map(function (proto) {
            return Reflect.ownKeys(proto).map(function (key) {
                return Reflect.defineProperty(target.prototype, key, Reflect.getOwnPropertyDescriptor(proto, key));
            });
        });
    }
    /**
     * For each property specified in props will create a method 
     * in target with the same name that will call all methods within
     * protos that share said name.
     * 
     * TODO: limit it so only methods can be composed (no set/get)
     *       refactor using Reflect API
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
        props.map(function (prop) {
            target.prototype[prop] = function () {
                protos.map(function (proto) {
                    return proto[prop] && proto[prop]();
                });
            };
        });
    }
    /**
     * Function that returns a superclass whose properties are mixed
     * with the ones of the different classes and whose constructor,
     * as well as props passed as arguments (propsToMix) are the 
     * result of composing those methods between all the classes.
     */
    return function () {
        for (var _len2 = arguments.length, classes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            classes[_key2] = arguments[_key2];
        }

        if (classes.some(function (clazz) {
            return typeof clazz !== 'function';
        })) {
            throw new Error('Invalid classes, must be of the type function');
        }
        var protos = classes.map(function (clazz) {
            return clazz.prototype;
        });
        var superclass = mixCtors(protos);
        mixProtos(superclass, protos);
        composeProps(superclass, protos, propsToMix);
        return superclass;
    };
};

/**
 * Creates a mixin that will compose the method init() of
 * the classes passed as a parameter.
 */
var propsToCompose = ['init'];
var configMixin = mixinWithComposition.apply(undefined, propsToCompose);

var ConfigService = function (_configMixin) {
    inherits(ConfigService, _configMixin);

    function ConfigService() {
        classCallCheck(this, ConfigService);

        /**
         * Initialize default configs of the
         * different configuration services
         * that are specified in the mixin
         */
        return possibleConstructorReturn(this, (ConfigService.__proto__ || Object.getPrototypeOf(ConfigService)).call(this));
    }

    createClass(ConfigService, [{
        key: 'init',
        value: function init(customConfig) {
            /**
             * Merge the previously initialized default
             * properties with the ones specified by the
             * user, then call init method of all the 
             * mixed classes.
             */
            this._mergeConfig(customConfig);
            get(ConfigService.prototype.__proto__ || Object.getPrototypeOf(ConfigService.prototype), 'init', this).call(this);
        }
    }, {
        key: '_mergeConfig',
        value: function _mergeConfig(config) {
            Object.assign(this, config);
        }
    }]);
    return ConfigService;
}(configMixin(I18nConfig, LoaderConfig, ValidationConfig));

var configService = new ConfigService();

var _dec$3;
var _class$3;

var SEPARATOR = '#';
/**
 * Custom loader to lazy load modules via scripts. Routes
 * must be specified using the following pattern:
 *  PathToModule#ModuleName
 * 
 * TODO: pass a route object instead of path to load dependencies
 * 
 * @export
 * @class AfModuleLoader
 */

var AfModuleLoader = (_dec$3 = _walas_angularVendor.Injectable(), _dec$3(_class$3 = function () {
    function AfModuleLoader(compiler) {
        classCallCheck(this, AfModuleLoader);

        this._compiler = compiler;
    }

    createClass(AfModuleLoader, [{
        key: 'load',
        value: function load(path) {
            var _this = this;

            var _splitPath2 = this._splitPath(path),
                modulePath = _splitPath2.modulePath,
                moduleName = _splitPath2.moduleName;

            var namespace = configService.getNamespace();
            return new Promise(function (resolve, reject) {
                var loadedModule = _this._getModule(namespace, moduleName);
                if (loadedModule) {
                    resolve(loadedModule);
                }
                var script = document.createElement('script');
                script.src = modulePath;
                script.onload = function () {
                    loadedModule = _this._getModule(namespace, moduleName);
                    if (!loadedModule) {
                        reject(moduleName + ' could not be found although ' + modulePath + ' was correctly loaded');
                    }
                    _this._compiler.compileModuleAsync(loadedModule).then(function (ngModule) {
                        script.remove();
                        resolve(ngModule);
                    }).catch(function (error) {
                        reject(error);
                    });
                };
                script.onerror = function (error) {
                    reject('Could not load ' + path);
                };
                document.head.appendChild(script);
            });
        }
    }, {
        key: '_splitPath',
        value: function _splitPath(path) {
            var _path$split = path.split(SEPARATOR),
                _path$split2 = slicedToArray(_path$split, 2),
                modulePath = _path$split2[0],
                moduleName = _path$split2[1];

            return { modulePath: modulePath, moduleName: moduleName };
        }
    }, {
        key: '_getModule',
        value: function _getModule(namespace, moduleName) {
            return window && window[namespace] && window[namespace][moduleName];
        }
    }]);
    return AfModuleLoader;
}()) || _class$3);
Reflect.defineMetadata('design:paramtypes', [_walas_angularVendor.Compiler], AfModuleLoader);

/**
 * ModuleLoaderProvider to use in the NgModule
 * providers property. Will make it use the
 * AfModuleLoader as the default FactoryLoader.
 */
var AfModuleLoaderProvider = {
  provide: _walas_angularVendor.NgModuleFactoryLoader,
  useClass: AfModuleLoader
};

var getPathToModule = function getPathToModule(moduleName) {
    // TODO: solve this.
    return "app/src/modules/" + moduleName + "/dist/" + moduleName + ".js";
};
var getChildrenPath = function getChildrenPath(moduleName) {
    return getPathToModule(moduleName) + "#" + moduleName;
};
var resolveRoutes = function resolveRoutes() {
    return Object.keys(window.routes).map(function (routeKey) {
        var route = window.routes[routeKey];
        return {
            path: route.path,
            loadChildren: getChildrenPath(routeKey)
        };
    });
};
var composeRoutes = function composeRoutes() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return [].concat(toConsumableArray(resolveRoutes()), args);
};

/**
 * We need to return an object with the form:
 *  {
 *      path,
 *      loadChildren
 *  }
 * path must be the url to the lazy loaded module
 * and loadChildren needs to be an object in the lines of:
 *  {
 *      path: where do we get the module from ??
 *      moduleName,
 *      dependencies: [dependencies that need to be lazy loaded] ??
 *  }
 * 
 * NEEDS SPPECIFICATION
 */

var _dec$5;
var _class$5;

/**
 * Service so the validations of a given model
 * can access all of its properties.
 * 
 * @export
 * @class ModelService
 */

var ModelService = (_dec$5 = _walas_angularVendor.Injectable(), _dec$5(_class$5 = function () {
    function ModelService() {
        classCallCheck(this, ModelService);

        this._model = null;
    }

    createClass(ModelService, [{
        key: 'model',
        set: function set$$1(value) {
            this._model = value;
        },
        get: function get$$1() {
            return this._model;
        }
    }]);
    return ModelService;
}()) || _class$5);

var _dec$4;
var _dec2$1;
var _class$4;
var _class2$1;
var _descriptor$1;

function _initDefineProp$1(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * Directive to automatically build the model specified as input.
 * @Example: model="person.profile.name" will create the neccesarry
 *           properties inside person in order to get this final structure:
 *              ParentComponent: {
 *                  person: {
 *                      profile: {
 *                         
 *                      }
 *                  }
 *              }
 * It will also create references in the host component to the
 * target (person.profile) prop (name) and will make up a name
 * to use in form controls replacing the dots by underscores
 * (person_profile_name).
 * 
 * TODO: support for not nested model??
 * 
 * It will also set the root or parent model to the modelService
 * for validation purposes.
 * 
 * @WARNING: in order to achieve this some private properties
 * of ViewContainerRef are being used (_data and _view). 
 * 
 * @export
 * @class Model
 */

var Model = (_dec$4 = _walas_angularVendor.Directive({
    selector: '[model]',
    providers: [ModelService]
}), _dec2$1 = _walas_angularVendor.Input(), _dec$4(_class$4 = (_class2$1 = function () {
    function Model(vcRef, modelService) {
        classCallCheck(this, Model);

        _initDefineProp$1(this, 'model', _descriptor$1, this);

        this._vcRef = vcRef;
        this._modelService = modelService;
        this._path = null;
    }

    createClass(Model, [{
        key: 'ngOnInit',
        value: function ngOnInit() {
            this._path = this._transformModelToPath();
            this._setComponentAttrs();
            this._setModelServiceModel();
        }
    }, {
        key: '_transformModelToPath',
        value: function _transformModelToPath() {
            if (!this.model) {
                this._throwModelError('No value was given for the model.');
            }
            var path = this.model.split('.');
            /**
             * TODO: support for not nested model??
             */
            if (path.length === 1) {
                this._throwModelError('Cannot write directly into the model, a property must be specified.');
            }
        }
    }, {
        key: '_setComponentAttrs',
        value: function _setComponentAttrs() {
            var component = this._getComponent();
            component.prop = this._getProp();
            component.target = this._getTarget();
            component.name = this._getName();
        }
    }, {
        key: '_getProp',
        value: function _getProp() {
            /**
             *  Don't use Array.pop() in order to avoid
             *  side effects.
             */
            return this._path[this._path.length - 1];
        }
    }, {
        key: '_getTarget',
        value: function _getTarget() {
            var pathBetweenParentAndProp = this._path.slice(1, this._path.length - 1);
            return pathBetweenParentAndProp.reduce(function (pre, cur) {
                pre[cur] = pre[cur] || {};
                return pre[cur];
            }, this._getParentModel());
        }
    }, {
        key: '_getParentModel',
        value: function _getParentModel() {
            var parentModelKey = this._path[0];
            var parentComponent = this._getParentComponent();
            var parentModel = parentComponent[parentModelKey] = parentComponent[parentModelKey] || {};
            if ((typeof parentModel === 'undefined' ? 'undefined' : _typeof(parentModel)) !== 'object') {
                this._throwModelError('The base model must be of type object.');
            }
            return parentModel;
        }
    }, {
        key: '_getName',
        value: function _getName() {
            return this.model.replace(/\./g, '_');
        }
    }, {
        key: '_setModelServiceModel',
        value: function _setModelServiceModel() {
            this._modelService.model = this._getParentModel();
        }
    }, {
        key: '_getComponent',
        value: function _getComponent() {
            /**
             * WARNING: this is a workaround to access the angular component
             * in which this directive is being used, in the future there may be
             * a better method or this one may stop working.
             */
            return this._vcRef._data.componentView.component;
        }
    }, {
        key: '_getParentComponent',
        value: function _getParentComponent() {
            /**
             * WARNING: this is a workaround to access the angular component
             * that contains the one in which this directive is being used,
             * in the future there may be a better method or this one may stop working.
             */
            return this._vcRef._view.component;
        }
    }, {
        key: '_throwModelError',
        value: function _throwModelError(msg) {
            var exceptionLocation = 'component: ' + this._getComponent().constructor.name + ' inside: ' + this._getParentComponent().constructor.name;
            throw new Error(msg + ' At ' + exceptionLocation);
        }
    }]);
    return Model;
}(), (_descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, 'model', [_dec2$1], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2$1)) || _class$4);
Reflect.defineMetadata('design:paramtypes', [_walas_angularVendor.ViewContainerRef, ModelService], Model);

var _dec$6;
var _dec2$2;
var _dec3;
var _class$6;
var _class2$2;
var _descriptor$2;
var _descriptor2;

function _initDefineProp$2(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var VALIDATORS_PROVIDER = {
    provide: _walas_angularVendor.NG_VALIDATORS,
    useExisting: _walas_angularVendor.forwardRef(function () {
        return Rule;
    }),
    multi: true
};

/**
 * Directive that given a path of the form 'entity.field'
 * finds its asociated validations in the configService and
 * using the validators obtained from that same service
 * creates angular validator functions.
 * 
 * It will act as a provider for NG_VALIDATORS.
 * 
 * setValidity can be passed as input in order to 
 * modify the native valid attribute of html inputs.
 * 
 * @export
 * @class Rule
 */

var Rule = (_dec$6 = _walas_angularVendor.Directive({
    selector: '[rule][ngModel]',
    providers: [VALIDATORS_PROVIDER]
}), _dec2$2 = _walas_angularVendor.Input('rule'), _dec3 = _walas_angularVendor.Input(), _dec$6(_class$6 = (_class2$2 = function () {
    function Rule(modelService) {
        classCallCheck(this, Rule);

        _initDefineProp$2(this, 'path', _descriptor$2, this);

        _initDefineProp$2(this, 'setValidity', _descriptor2, this);

        this._modelService = modelService;
    }

    createClass(Rule, [{
        key: 'ngOnInit',
        value: function ngOnInit() {
            if (!this.path) {
                // Prevent breack due to not yet initialized path.
                return;
            }
            this.validationFunctions = this._getValidationFunctions();
        }
    }, {
        key: 'validate',
        value: function validate(control) {
            if (!this.path) {
                // Prevent breack due to not yet initialized path.            
                return;
            }
            var errors = _walas_angularVendor.Validators.compose(this.validationFunctions)(control);
            this.setValidity(!errors);
            return errors;
        }
    }, {
        key: '_getValidationFunctions',
        value: function _getValidationFunctions() {
            var _this = this;

            return this._getValidations().map(function (validationObj) {
                var _getValidationParams2 = _this._getValidationParams(validationObj),
                    func = _getValidationParams2.func,
                    args = _getValidationParams2.args,
                    msg = _getValidationParams2.msg,
                    fromModel = _getValidationParams2.fromModel;

                return function (control) {
                    var scope = fromModel ? _this._modelService.model : {};
                    var thisArgs = [control.value || ''].concat(args);
                    return func.apply(scope, thisArgs) ? null : defineProperty({}, func.name, msg);
                };
            });
        }
    }, {
        key: '_getValidations',
        value: function _getValidations() {
            var keys = this.path.split('.');
            var entity = keys[0];
            var field = keys[1];
            return configService.getValidations()[entity][field];
        }
    }, {
        key: '_getValidationParams',
        value: function _getValidationParams(validationObj) {
            var validationName = this._getValidatonName(validationObj);
            var validation = validationObj[validationName];
            var allArgs = validation.arguments || [];
            var validators = configService.getValidators();
            var MODEL_KEYWORD = configService.getModelKeyword();
            return {
                func: validators[validationName],
                args: allArgs.filter(function (c) {
                    return c !== MODEL_KEYWORD;
                }),
                msg: validation.message || configService.getDefaultValidationError(),
                fromModel: allArgs.includes(MODEL_KEYWORD)
            };
        }
    }, {
        key: '_getValidatonName',
        value: function _getValidatonName(validationObj) {
            return Object.keys(validationObj)[0];
        }
    }]);
    return Rule;
}(), (_descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, 'path', [_dec2$2], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor2 = _applyDecoratedDescriptor$2(_class2$2.prototype, 'setValidity', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2$2)) || _class$6);
Reflect.defineMetadata('design:paramtypes', [ModelService], Rule);

var _dec;
var _class;

var ALL = [Rule, Model, AfForm];

var WalasAngularCore = (_dec = _walas_angularVendor.NgModule({
    imports: [_walas_angularVendor.FormsModule, _walas_angularVendor.CommonModule],
    exports: ALL,
    declarations: ALL
}), _dec(_class = function WalasAngularCore() {
    classCallCheck(this, WalasAngularCore);
}) || _class);

// import first to satisfy dependencies

exports.WalasAngularCore = WalasAngularCore;
exports.ExtendComponent = ExtendComponent;
exports.AfForm = AfForm;
exports.FormService = FormService;
exports.AfModuleLoader = AfModuleLoader;
exports.AfModuleLoaderProvider = AfModuleLoaderProvider;
exports.getPathToModule = getPathToModule;
exports.getChildrenPath = getChildrenPath;
exports.resolveRoutes = resolveRoutes;
exports.composeRoutes = composeRoutes;
exports.Model = Model;
exports.ModelService = ModelService;
exports.Rule = Rule;
exports.configService = configService;
exports.mixinWithComposition = mixinWithComposition;
Object.keys(_walas_angularVendor).forEach(function (key) { exports[key] = _walas_angularVendor[key]; });

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=walas_angular_core.js.map
