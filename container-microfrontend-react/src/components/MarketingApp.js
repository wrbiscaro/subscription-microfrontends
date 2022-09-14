//Poderiamos ter exposto um React component no remote e importado aqui, mas estariamos acoplando dependencia de framework
//Exportar uma função "mount" que renderiza um component do remote em um html enviado pelo container como parametro da funcao é uma pratica que elimina essa dependencia
import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current);
    });

    return <div ref={ref} />;
};

