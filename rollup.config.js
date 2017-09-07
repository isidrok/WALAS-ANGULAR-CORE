import babel from 'rollup-plugin-babel';
// import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

const NAMESPACE = require('./namespace.config.json').namespace;
const getModuleName = function(name) {
    return `${NAMESPACE}.${name}`;
};
const globals = {
    '@walas/angular-vendor': getModuleName('walasAngularVendor'),
    '@walas/angular-vendor-browser': getModuleName('walasAngularVendorBrowser')
};

export default {
    entry: 'src/index.js',
    dest: 'dist/walas_angular_core.min.js',
    format: 'umd',
    exports: 'named',
    globals: globals,
    external: Object.keys(globals),
    moduleName: getModuleName('walasAngularCore'),
    plugins: [
        string({
            include: '**/*.html'
        }),
        json({
            exclude: 'node_modules/**',
            preferConst: true
        }),
        resolve(),
        // commonjs({
        //     include: 'node_modules/**'
        // }),
        babel({
            exclude: [
                'node_modules/**'
            ]
        }),
        uglify()
    ],
    sourceMap: true,
    sourceMapFile: 'dist/walas_angular_core.min.js.map'
};