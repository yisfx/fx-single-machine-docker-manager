
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { ProgressPlugin } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';




export default <webpack.Configuration>{
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=happyBabel',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=happyBabel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: (url: string, _resourcePath: string) => url.includes('/fonts/')
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        
        new ProgressPlugin(function handler(percentage: number, msg: string) {
            if (percentage == 0) {
                console.log("webpack start");
            }
        }),
        new CleanWebpackPlugin(),

    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'initial',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                default: false,
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/
                }
                // common: {
                //     name: 'common',
                //     test: /[\\/]node_modules[\\/]@fx-package/,
                //     priority: 10
                // }
            }
        }
    },
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.config', '.js', '.json', '.css', ".png"]
    },
};
