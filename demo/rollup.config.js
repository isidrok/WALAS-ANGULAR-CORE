import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';

const NAMESPACE = require('./namespace.config.json').namespace;
const getModuleName = function(name) {
    return `${NAMESPACE}.${name}`;
};

export default {
    entry: 'src/index.js',
    dest: 'dist/walas_angular_core_demo.umd.js',
    format: 'umd',
    sourceMap: true,
    exports: 'named',
    moduleName: getModuleName('walasAngularCoreDemo'),
    plugins: [
        string({
            include: '**/*.html'
        }),
        resolve(),
        commonjs({
            include: [
                'node_modules/**'
            ],
            exclude: [
                'node_modules/@walas/**'
            ]
        }),
        babel({
            exclude: [
                'node_modules/**'
            ]
        })
    ]
};