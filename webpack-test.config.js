/*
 * webpack.config.js - webpack configuration script for ilib-resbundle
 *
 * Copyright © 2022, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: "development",
    entry: "./test/testSuiteWeb.js",
    output: {
        path: path.resolve(__dirname, 'test'),
        filename: "ilib-resbundle-test.js",
        library: {
            name: "ilibResBundleTest",
            type: "umd"
        }
    },
    externals: {
        "./NodeLoader.js": "NodeLoader",
        "./QtLoader.js": "QtLoader",
        "./RhinoLoader.js": "RhinoLoader",
        "./NashornLoader.js": "NashornLoader",
        "./RingoLoader.js": "RingoLoader",
        "log4js": "log4js",
        "nodeunit": "nodeunit"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: /node_modules\/ilib-/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            "add-module-exports",
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        fallback: {
            buffer: require.resolve("buffer")
        },
        alias: {
            "calling-module": path.join(path.dirname(module.id), "assembled")
        }
    },
    optimization: {
        minimize: false
    }
};
