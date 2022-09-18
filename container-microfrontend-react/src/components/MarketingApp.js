//Poderiamos ter exposto um React component no remote e importado aqui, mas estariamos acoplando dependencia de framework
//Exportar uma função "mount" que renderiza um component do remote em um html enviado pelo container como parametro da funcao é uma pratica que elimina essa dependencia
import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    //Cria uma copia do objeto BrowserHistory
    const history = useHistory();

    useEffect(() => {
        mount(ref.current, {
            //Envia uma funcao de callback para que o mfe marketing informe quando fizer um router e ele atualizar o BrowserHistory com o path atual
            //Recebe um objeto do mfe de marketing e dentre seus atributos temos o pathname, que indica para qual path o mfe vai fazer o router
            //Fazemos um destructuring do objeto e renomeamos o atributo pathname para nextPathname
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                //Verifica se o path é diferente e só atualiza nesse caso, para evitar loop infinito
                if(pathname !== nextPathname) {
                    //Atualiza o BrowserHistory com o path que o mfe de marketing fez o router
                    history.push(nextPathname);
                }
            }
        });
    });

    return <div ref={ref} />;
};

