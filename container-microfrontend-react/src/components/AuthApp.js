//Poderiamos ter exposto um React component no remote e importado aqui, mas estariamos acoplando dependencia de framework
//Exportar uma função "mount" que renderiza um component do remote em um html enviado pelo container como parametro da funcao é uma pratica que elimina essa dependencia
import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    //Cria uma copia do objeto BrowserHistory
    const history = useHistory();

    useEffect(() => {
        //Recebe qual funcao do mfe sera usada por ele para atualizar o MemoryHistory em caso de navegacao em links do container
        const { onParentNavigation } = mount(ref.current, {
            //Envia uma funcao de callback para que o mfe auth informe quando fizer um router e ele atualizar o BrowserHistory com o path atual
            //Recebe um objeto do mfe de auth e dentre seus atributos temos o pathname, que indica para qual path o mfe vai fazer o router
            //Fazemos um destructuring do objeto e renomeamos o atributo pathname para nextPathname
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                //Verifica se o path é diferente e só atualiza nesse caso, para evitar loop infinito
                if(pathname !== nextPathname) {
                    //Atualiza o BrowserHistory com o path que o mfe de auth fez o router
                    history.push(nextPathname);
                }
            }
        }, []); //useEffect() roda em qualquer mudança no componente, então enviamos o [] como segundo argumento pra ele executar apenas 1 vez (na renderizacao inicial)

        //Informa o mfe que teve atualizacao no path usando a callback enviada por ele, para que ele possa atualizar o MemoryHistory
        history.listen(onParentNavigation);
    });

    return <div ref={ref} />;
};

