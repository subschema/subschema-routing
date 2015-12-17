var path = require('path');
var join = path.join.bind(path, __dirname);

var webpack = require('webpack');

module.exports = {

    devtool: 'sourcemap',
    entry: [
        join('src/index.jsx')
    ],

    devServer: {
        contentBase: join("public"),
        info: true, //  --no-info option
        hot: true,
        inline: true,
        port: 7100
    },

    output: {
        path: join("dist"),
        filename: 'subschema-router.js',
        sourceMapFilename: '[file].map',
        libraryTarget: 'umd',
        library: 'Subschema',
        pathinfo: false
    },
    stats: {
        colors: true,
        reasons: true
    },
    externals: {

        "react": {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "Subschema": {
            "root": "Subschema",
            commonjs2: "subschema",
            commonjs: "subschema",
            "amd": "subschema"
        }
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                include: [
                    join('src')
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

