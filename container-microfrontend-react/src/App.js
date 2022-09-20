//lazy e Suspense são usados em conjunto para fazer o lazy loading
import React, { lazy, Suspense, useState } from 'react';
//Componente para fazer o Router utilizando Browser History
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Componentes para fazer o CSS-in-JS e evitar conflitos de CSS
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Progress from './components/Progress';
import Header from './components/Header';

//Importa os componentes com lazy, para carregar os js relacionados a eles apenas quando forem necessarios (lazy loading)
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    //Adiciona um prefixo com iniciais do projeto nos nomes gerados pelo Material UI (css-in-js)
    //Como cada projeto vai informar seu prefixo, não ocorrerá conflito de nomes de CSS devido a minificação de produção
    productionPrefix: 'co'
});

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    //O componente de Route faz o match pela primeira parte do path
    //No caso de paths como /auth/sign, /auth/signup, /auth/qlqcoisa, o componente de auth é carregado
    //No caso de paths como /, /pricing, /qlqcoisa, o componente de marketing é carregado
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};