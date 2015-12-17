var path = require('path');
var join = path.join.bind(path, __dirname);

var webpack = require('webpack');

module.exports = {

    devtool: 'sourcemap',
    entry: [
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
        path: join(".build"),
        filename: 'app.[hash].js',
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
                include: [
                    //      /node_modules\/(?!(subschema-builder|component-playground|react-))/,
                    join('src'),
                    join('public')
                ],
                loaders: ['babel?stage=0&ignore=buffer']
            }
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.js'],
        alias: {
            'Subschema': join('node_modules/subschema/dist/subschema-noreact'),
            'react': join('node_modules/react'),
            'SubschemaRouting': join('src/index.jsx')
        }
    },

    plugins: [
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

