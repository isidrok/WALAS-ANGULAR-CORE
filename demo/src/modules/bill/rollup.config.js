import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';

export default {
    entry: 'src/index.js',
    dest: 'dist/demo_bill.umd.js',
    format: 'umd',
    sourceMap: true,
    external: [
        '@walas/angular-core'
    ],
    globals: {
        '@walas/angular-core': 'WALAS.walasAngularCore'
    },
    moduleName: 'DEMO.BillModule',
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