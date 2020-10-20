const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');
const singleSpaDefaults = require("webpack-config-single-spa");


module.exports = webpackConfigEnv => {
    const defaultConfig = singleSpaDefaults({
        // The name of the organization this application is written for
        orgName: 'name-of-company',
        // The name of the current project. This usually matches the git repo's name
        projectName: 'name-of-project',
        // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
        webpackConfigEnv,
    });

    return merge(defaultConfig, {
        entry: path.resolve(__dirname, "src/config.js"),
        output: {
            filename: "qualis-mf-root-config.js",
            libraryTarget: "system",
            path: path.resolve(__dirname, "dist"),
        },
        devtool: "inline-source-map",
        optimization: {
            minimize: true,
        },
        resolve: {
            alias: {
                "@node_modules": path.resolve(__dirname, "node_modules"),
                "@app": path.resolve(__dirname, "src/"),
                "@public": path.resolve(__dirname, "public/")
            },
            extensions: [
                "*",
                ".js",
                ".jsx",
                ".scss",
                ".css",
                ".ejs"
            ]
        },
        module: {
            rules: [
                { parser: { system: false } },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            targets: {
                                                esmodules: true
                                            }
                                        }
                                    ]
                                ],
                            }
                        }
                    ],
                },
                {
                    test: /\.(sa|sc)ss$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: {
                                    namedExport: false,
                                    localIdentName: "[local]-[hash:base64:12]"
                                },
                                importLoaders: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
            ],
        },
        devServer: {
            historyApiFallback: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            disableHostCheck: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: "src/index.ejs",
                isLocal: webpackConfigEnv && webpackConfigEnv.isLocal || true
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].[hash].css",
                chunkFilename: "[id].[hash].css"
            }),
        ],
        externals: ["single-spa", /^@qualis-mf\/.+$/],
    })
}
