import Vue from 'vue'
import Router from 'vue-router'
import Panel from '@/pages/panel'
import SignIn from '@/pages/SignIn'
import Models from '@/pages/Models'
import Users from '@/pages/Users'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Panel',
        component: Panel,
        children: [{
            path: 'models',
            name: 'Models',
            component: Models
        }, {
            path: 'users',
            name: 'Users',
            component: Users
        }]
    }, {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    }, {
        path: '*',
        redirect: '/models',
        name: '404',
    }, ]
})
