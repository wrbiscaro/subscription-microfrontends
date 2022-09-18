import React from 'react';
//Utiliza Router default ao invés de BrowserHistory, para integrar com component de MemoryHistory
import { Switch, Route, Router } from 'react-router-dom';
//Componentes para fazer o CSS-in-JS e evitar conflitos de CSS
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const generateClassName = createGenerateClassName({
    //Adiciona um prefixo com iniciais do projeto nos nomes gerados pelo Material UI (css-in-js)
    //Como cada projeto vai informar seu prefixo, não ocorrerá conflito de nomes de CSS devido a minificação de produção
    productionPrefix: 'ma'
});

export default ({ history }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/pricing" component={Pricing}></Route>                    
                        <Route path="/" component={Landing}></Route>
                    </Switch>
                </Router>
            </StylesProvider>

        </div>
    );
};