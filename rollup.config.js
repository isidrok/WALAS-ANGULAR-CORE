import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';

const NAMESPACE = require('./namespace.config.json');
const DEPS = require('./deps.config.json');
const getModuleName = function(name) {
    return `${NAMESPACE}.${name}`;
};

export default {
    entry: 'src/index.js',
    dest: 'dist/core.js',
    format: 'umd',
    moduleName: getModuleName('Core'),
    external: DEPS.external,
    globals: DEPS.globals,
    plugins: [
        string({
            include: '**/*.html'
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: [
                'node_modules/**'
            ]
        })
        uglify()
    ],
    sourceMap: true,
    sourceMapFile: 'dist/core.js.map'
};