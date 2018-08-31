import Vue from 'vue'
import Router from 'vue-router'
import Panel from '@/pages/panel'
import SignIn from '@/pages/sign-in'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Panel',
        component: Panel
    }, {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    }, {
        path: '*',
        redirect: '/',
        name: '404',
    }, ]
})
