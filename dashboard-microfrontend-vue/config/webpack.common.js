const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                //Usaremos o babel para transpilar nossos arquivos js e mjs (ES6)
                //O Babel converte códigos javascript atuais (ECMAScript 2018, por exemplo) em código que pode ser compreendido por navegadores mais antigos
                //Para fazer isso ele precisa dos presets, então utilizaremos os presets abaixo (dep no package.json)
                test: /\.m?js$/, //Arquivos js e mjs
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
};