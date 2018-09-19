import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';
import VueLodash from 'vue-lodash'
import VueMq from 'vue-mq'
import DeclNum from './directives/DeclNum'
import Thousands from './directives/thousands'
import checkUser from '@/utils/check-user';

import '@/filters';

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueLodash);

Vue.use(VueMq, {
    breakpoints: { // default breakpoints - customize this
        sm: 1200,
        xl: Infinity,
    }
})

Vue.directive('decl-num', DeclNum)
Vue.directive('thousands', Thousands)

Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    next(response => {
        if(response.status === 401 || response.status === 403) {
            signOut()
        }
    })
});

moment.locale('ru');

const myApp = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    beforeMount() {
        checkUser(this)
    }
})

function signOut() {
    myApp.$router.push({ name: 'SignIn' })
}
