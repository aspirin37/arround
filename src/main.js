import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';

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

import checkUser from '@/utils/check-user';

const myApp = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    async beforeMount() {
        let lala = await checkUser(this)
        console.log(lala)
    }
})

function signOut() {
    myApp.$router.push('sign-in')
}
