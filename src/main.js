// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueResource);

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    next(response => {
        if(response.status === 401 || response.status === 403) {
            signOut()
        }
    })
});

/* eslint-disable no-new */
import checkUser from '@/utils/check-user';

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
    myApp.$router.push('sign-in')
}
