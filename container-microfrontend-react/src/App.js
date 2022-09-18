import React from 'react';
//Componente para fazer o Router utilizando Browser History
import { BrowserRouter } from 'react-router-dom';
//Componentes para fazer o CSS-in-JS e evitar conflitos de CSS
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

const generateClassName = createGenerateClassName({
    //Adiciona um prefixo com iniciais do projeto nos nomes gerados pelo Material UI (css-in-js)
    //Como cada projeto vai informar seu prefixo, não ocorrerá conflito de nomes de CSS devido a minificação de produção
    productionPrefix: 'co'
});

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <MarketingApp />
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};