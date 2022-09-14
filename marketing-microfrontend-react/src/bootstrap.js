import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mount = (element) => {
    //Renderiza nosso component App em um elemento a ser recebido com o ReactDOM
    ReactDOM.render(<App />, element);
};

//Webpack seta o NODE_ENV com o que está no mode do webpack.config.js
if(process.env.NODE_ENV === 'development') {
    const element = document.querySelector('#_marketing-dev-root');

    //Assumimos que o ambiente é develoment (microfrontend isolado)
    //Assumimos que apenas o ambiente de development tem uma div com o id #_marketing-dev-root
    if(element) {
        //Provavelmente estamos rodando em ambiente de development (microfrontend isolado)
        mount(element);
    }
}

//Exporta a funcao para o container importar
export { mount }
