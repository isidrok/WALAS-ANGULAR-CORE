import config from './rollup.config.js';

config.plugins.pop(); // remove uglify
config.targets = [
    {dest: 'dist/walas_angular_core.umd.js', format: 'umd'},
    {dest: 'dist/walas_angular_core.js', format: 'es'},
];
export default config;