const path = require('path')

module.exports = {

    entry: {
        'main': './src/index.tsx'
    },

    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css" ]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /* externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/

    devServer: {
        contentBase: [ './public', './node_modules' ],
        publicPath: '/dist/',
        compress: true,
        port: 9000,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            ignored: [
                    /node_modules/,
                    path.resolve(__dirname, 'dist')
                ]
        }
      }
};
