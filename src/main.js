// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Notifystr from 'notifystr';
import VueResource from 'vue-resource';

Vue.use(BootstrapVue);
Vue.use(Notifystr);
Vue.use(VueResource);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

let API_BASE;
let protocol = (document.location && document.location.protocol) || 'http:';

switch (process.env.NODE_ENV) {
    case 'development':
        API_BASE = `${protocol}//devarapi.a3technology.ru`;
        break;
    default:
        API_BASE = `${protocol}//arapi.a3technology.ru`;
        break;
}

Vue.http.options = {
    root: API_BASE,
};

// console.log(process.env, Vue.http.options)
