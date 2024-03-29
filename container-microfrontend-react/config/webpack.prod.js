const { merge } = require('webpack-merge'); //Serve para mergear dois webpack configs file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production', //Com o modo production, o webpack faz algumas otimizações (minificacao, por exemplo)
    output: {
        filename: '[name].[contenthash].js', //Todos os arquivos terão o seu nome + hash para evitar problemas de cache
        publicPath: '/container-microfrontend-react/latest/' //Diretorio do bucket s3 de onde o cloudffront vai carregar arquivos públicos (js, css, etc)
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container', //Não necessario no container, mas adicionado por convencao
            remotes: {
                //O primeiro "marketing" é usado no import no container
                //O segundo "marketing" faz um match com o name no webpack.config do mfe/componentes expostos no localhost:8081/remoteEntry.js
                marketing: `marketing@${domain}/marketing-microfrontend-react/latest/remoteEntry.js`, //Diretorio do s3 onde ficam os artefatos do mfe de marketing
                auth: `auth@${domain}/auth-microfrontend-react/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard-microfrontend-vue/latest/remoteEntry.js`
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