import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (element) => {
    const app = createApp(Dashboard);
    app.mount(element); //Mount do Vue
};

//Webpack seta o NODE_ENV com o que está no mode do webpack.config.js
if(process.env.NODE_ENV === 'development') {
    const element = document.querySelector('#_dashboard-dev-root');

    //Assumimos que o ambiente é develoment (microfrontend isolado)
    //Assumimos que apenas o ambiente de development tem uma div com o id #_auth-dev-root
    if(element) {
        //Provavelmente estamos rodando em ambiente de development (microfrontend isolado)
        mount(element);
    }
}

//Exporta a funcao para o container importar
export { mount }
