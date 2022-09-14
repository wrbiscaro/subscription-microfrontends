const { merge } = require('webpack-merge'); //Serve para mergear dois webpack configs file
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            //Name é a global variable que o container usa quando o script é carregado
            //O container faz um match desse name com o que está configurado como remotes no webpack.config dele
            name: 'marketing', 
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap' //Expoe o arquivo bootstrap com o nome 'MarketingApp', para ser importado nos componentes do container
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