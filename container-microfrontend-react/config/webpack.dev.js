const { merge } = require('webpack-merge'); //Serve para mergear dois webpack configs file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        //Devemos informar o publicPath para o webpack saber de onde carregar o main.js no remoteEntry
        //Por padrao, o webpack faz o output do main.js no path "/"
        //Caso não informado o publicPath, por padrao o webpack busca o main.js no path "/" relativo ao dominio do remoteEntry
        //O comportamento padrao nao funciona quando a pagina tem nested path (/auth/signin, por exemplo), por isso devemos sempre informar o publicPath
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container', //Não necessario no container, mas adicionado por convencao
            remotes: {
                //O primeiro "marketing" é usado no import no container
                //O segundo "marketing" faz um match com o name no webpack.config do mfe/componentes expostos no localhost:8081/remoteEntry.js
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            },
            //shared: ['react', 'react-dom']
            //Compartilha todas as dependencias do package.json, para evitar duplicidade
            //dependencies: dependencias usadas/carregadas no runtime do browser
            //dev-dependencies: dependencias utilizadas somente durante o build, então não precisamos compartilhar
            shared: packageJson.dependencies
        })
    ]
};

//Faz o merge com o webpack common config e exporta
//O devConfig fica como segundo parametro para ele sobreescrever as configs em comum com o commonConfig
module.exports = merge(commonConfig, devConfig);