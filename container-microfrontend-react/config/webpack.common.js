const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                //Usaremos o babel para transpilar nossos arquivos js e mjs (ES6)
                //O Babel converte códigos javascript atuais (ECMAScript 2018, por exemplo) em código que pode ser compreendido por navegadores mais antigos
                //Para fazer isso ele precisa dos presets, então utilizaremos os presets abaixo (dep no package.json)
                test: /\.m?js$/, //Arquivos js e mjs
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })            
    ]
};