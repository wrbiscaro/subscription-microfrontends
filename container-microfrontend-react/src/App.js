import React from 'react';
//Componente para fazer o Router utilizando Browser History
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Componentes para fazer o CSS-in-JS e evitar conflitos de CSS
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import MarketingApp from './components/MarketingApp';
import AuthApp from './components/AuthApp';
import Header from './components/Header';

const generateClassName = createGenerateClassName({
    //Adiciona um prefixo com iniciais do projeto nos nomes gerados pelo Material UI (css-in-js)
    //Como cada projeto vai informar seu prefixo, não ocorrerá conflito de nomes de CSS devido a minificação de produção
    productionPrefix: 'co'
});

export default () => {
    //O componente de Route faz o match pela primeira parte do path
    //No caso de paths como /auth/sign, /auth/signup, /auth/qlqcoisa, o componente de auth é carregado
    //No caso de paths como /, /pricing, /qlqcoisa, o componente de marketing é carregado
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/auth" component={AuthApp} />
                        <Route path="/" component={MarketingApp} />
                    </Switch>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};