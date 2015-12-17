var path = require('path');
var join = path.join.bind(path, __dirname);

var webpack = require('webpack');

module.exports = {

    devtool: 'eval',
    entry: [

        'webpack-dev-server/client?http://localhost:' + 7000,
        'webpack/hot/only-dev-server',
        join('public/index.jsx')
    ],

    devServer: {
        contentBase: join("public"),
        info: true, //  --no-info option
        hot: true,
        inline: true,
        port: 7100
    },

    output: {
        path: join(".hot"),
        filename: 'index.entry.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                //do this to prevent babel from translating everything.
                include: [
                    join('src'),
                    join('public')
                ],
                loaders: ['react-hot', 'babel-loader?stage=0&ignore=buffer']
            },
            {
                test: /\.js(x)?$/,
                exclude: [
                    //      /node_modules\/(?!(subschema-builder|component-playground|react-))/,
                    /babel/,
                    /react-router/,
                    /codemirror/,
                    join('src'),
                    join('public'),
                ],
                loaders: ['babel?stage=0&ignore=buffer']
            }
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.js'],
        alias: {
            'Subschema': join('node_modules/subschema/dist/subschema-noreact'),
            'react': join('node_modules/react')
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //     new ExtractTextPlugin('style.css', {allChunks: true}),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        function () {
            this.plugin("done", function (stats) {
                stats = stats.toJson();
                console.error(JSON.stringify({
                    assetsByChunkName: stats.assetsByChunkName
                }));
            });
        }
    ]

};

