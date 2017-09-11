import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

const NAMESPACE = require('./namespace.config.json').namespace;
const getModuleName = function(name) {
    return `${NAMESPACE}.${name}`;
};

export default {
    entry: 'src/index.js',
    targets: [
        {dest: 'dist/walas_angular_core.umd.min.js', format: 'umd'},
        // {dest: 'dist/walas_angular_core.min.js', format:'es'},
    ],
    sourceMap: true,
    exports: 'named',
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
        babel({
            exclude: [
                'node_modules/**'
            ]
        }),
        uglify()
    ]
};