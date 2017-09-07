import config from './rollup.config.js';

config.plugins.pop(); // remove uglify
config.dest = 'dist/walas_angular_core.js';
config.sourceMapFile = 'dist/walas_angular_core.js.map';
export default config;