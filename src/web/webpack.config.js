module.exports = {
    entry: {
        app: './lib/index.js'
    },

    output: {
        path: __dirname + '/public',
        filename: '[name].js'
    }
};
