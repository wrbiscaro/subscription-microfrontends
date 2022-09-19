import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
    //Cria um component de MemoryHistory (prod) ou BrowserHistory (dev/isolado) e envia via prop ao App
    //Apenas ambiente development envia o defaultHistory. Se nao enviar (prod), usa MemoryHistory
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

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
    const element = document.querySelector('#_auth-dev-root');

    //Assumimos que o ambiente é develoment (microfrontend isolado)
    //Assumimos que apenas o ambiente de development tem uma div com o id #_auth-dev-root
    if(element) {
        //Provavelmente estamos rodando em ambiente de development (microfrontend isolado)
        mount(element, { defaultHistory: createBrowserHistory() });
    }
}

//Exporta a funcao para o container importar
export { mount }
