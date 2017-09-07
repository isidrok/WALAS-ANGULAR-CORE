import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import config from './rollup.config.nomin.js';

config.plugins.unshift(
    serve({
        open: true,
        contentBase: '',
        port: 8080
    }),
    livereload({
        watch: 'dist'
    })
);
export default config;