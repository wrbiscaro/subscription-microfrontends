//lazy e Suspense são usados em conjunto para fazer o lazy loading
import React, { lazy, Suspense, useState, useEffect } from 'react';
//Componente para fazer o Router
import { Router, Route, Switch, Redirect } from 'react-router-dom';
//Componentes para fazer o CSS-in-JS e evitar conflitos de CSS
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
//Componente para fazer o Browser History
import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';

//Importa os componentes com lazy, para carregar os js relacionados a eles apenas quando forem necessarios (lazy loading)
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    //Adiciona um prefixo com iniciais do projeto nos nomes gerados pelo Material UI (css-in-js)
    //Como cada projeto vai informar seu prefixo, não ocorrerá conflito de nomes de CSS devido a minificação de produção
    productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]); //Executa o useEffect apenas em mudancas do isSignedIn

    //O componente de Route faz o match pela primeira parte do path
    //No caso de paths como /auth/sign, /auth/signup, /auth/qlqcoisa, o componente de auth é carregado
    //No caso de paths como /, /pricing, /qlqcoisa, o componente de marketing é carregado
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy/>
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};