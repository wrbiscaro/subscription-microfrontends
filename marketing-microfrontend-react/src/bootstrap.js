import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import App from './App';

const mount = (element, { onNavigate }) => {
    //Cria um component de MemoryHistory e envia via prop ao App
    const history = createMemoryHistory();
    //Chama a funcao de callback do container para informa-lo que teve um routing e ele atualizar o path no BrowserHistory
    if(onNavigate) {
        history.listen(onNavigate);
    }

    //Renderiza nosso component App em um elemento a ser recebido com o ReactDOM
    ReactDOM.render(<App history={history} />, element);

    //Envia um callback para o container enviar seu novo path em caso de navegação em links dele, assim o mfe pode atualizar seu MemoryHistory
    //Recebe um objeto do container e dentre seus atributos temos o pathname, que indica para qual path o container vai fazer o router
    //Fazemos um destructuring do objeto e renomeamos o atributo pathname para nextPathname
    return {
        onParentNavigation({ pathname: nextPathname }) {
            const { pathname } = history.location;

            //Verifica se o path é diferente e só atualiza nesse caso, para evitar loop infinito
            if(pathname !== nextPathname) {
                //Atualiza o MemoryHistory com o path que o container fez o router
                history.push(nextPathname);
            }
        }
    }
};

//Webpack seta o NODE_ENV com o que está no mode do webpack.config.js
if(process.env.NODE_ENV === 'development') {
    const element = document.querySelector('#_marketing-dev-root');

    //Assumimos que o ambiente é develoment (microfrontend isolado)
    //Assumimos que apenas o ambiente de development tem uma div com o id #_marketing-dev-root
    if(element) {
        //Provavelmente estamos rodando em ambiente de development (microfrontend isolado)
        mount(element, {});
    }
}

//Exporta a funcao para o container importar
export { mount }
