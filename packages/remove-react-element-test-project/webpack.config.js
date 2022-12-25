/*global __dirname*/
const path = require('path');

function buildWebpackConfig({ bundleName, removedElement }) {
    return {
        mode: 'production',
        target: 'node',
        entry: {
            app: path.join(__dirname, 'src', 'app.js')
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist', bundleName),
            chunkFilename: '[id].js',
            libraryTarget: 'commonjs'
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    include: [
                        path.resolve('./src')
                    ],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                envName: 'module',
                                plugins: [
                                    [ "remove-react-element", { "elementNames": [removedElement] } ]
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    };
}

module.exports = [
    buildWebpackConfig({ bundleName: 'mobile',  removedElement: 'Desktop' }),
    buildWebpackConfig({ bundleName: 'desktop', removedElement: 'Mobile'  }),
];