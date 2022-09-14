const { merge } = require('webpack-merge'); //Serve para mergear dois webpack configs file
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container', //Não necessario no container, mas adicionado por convencao
            remotes: {
                //O primeiro "marketing" é usado no import no container
                //O segundo "marketing" faz um match com o name no webpack.config do mfe/componentes expostos no localhost:8081/remoteEntry.js
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            //shared: ['react', 'react-dom']
            //Compartilha todas as dependencias do package.json, para evitar duplicidade
            //dependencies: dependencias usadas/carregadas no runtime do browser
            //dev-dependencies: dependencias utilizadas somente durante o build, então não precisamos compartilhar
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

//Faz o merge com o webpack common config e exporta
//O devConfig fica como segundo parametro para ele sobreescrever as configs em comum com o commonConfig
module.exports = merge(commonConfig, devConfig);