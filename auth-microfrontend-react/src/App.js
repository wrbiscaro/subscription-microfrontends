import React from 'react';
//Utiliza Router default ao invés de BrowserHistory, para integrar com component de MemoryHistory
import { Switch, Route, Router } from 'react-router-dom';
//Componentes para fazer o CSS-in-JS e evitar conflitos de CSS
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
    //Adiciona um prefixo com iniciais do projeto nos nomes gerados pelo Material UI (css-in-js)
    //Como cada projeto vai informar seu prefixo, não ocorrerá conflito de nomes de CSS devido a minificação de produção
    productionPrefix: 'au'
});

export default ({ history, onSignIn }) => {
    //Atenção para a ordem dos componentes de Route e exact path, pois pode gerar bug
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route path="/auth/signin">
                            <Signin onSignIn={onSignIn} />
                        </Route>
                        <Route path="/auth/signup">
                            <Signup onSignIn={onSignIn} />
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>

        </div>
    );
};