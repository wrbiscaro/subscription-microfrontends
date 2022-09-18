const { merge } = require('webpack-merge'); //Serve para mergear dois webpack configs file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production', //Com o modo production, o webpack faz algumas otimizações (minificacao, por exemplo)
    output: {
        filename: '[name].[contenthash].js' //Todos os arquivos terão o seu nome + hash para evitar problemas de cache
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
        })
    ]
};

//Faz o merge com o webpack common config e exporta
//O prodConfig fica como segundo parametro para ele sobreescrever as configs em comum com o commonConfig
module.exports = merge(commonConfig, prodConfig);