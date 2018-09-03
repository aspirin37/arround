import Vue from 'vue'
import Router from 'vue-router'
import Panel from '@/pages/Panel'
import SignIn from '@/pages/SignIn'
import Models from '@/pages/Models'
import Model from '@/pages/Model'
import Users from '@/pages/Users'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
        if(savedPosition) {
            return savedPosition
        } else if(to.name !== from.name) {
            return { y: 0 }
        }
    },
    routes: [{
        path: '/',
        name: 'Panel',
        component: Panel,
        children: [{
            path: 'models',
            name: 'Models',
            component: Models
        }, {
            path: 'models/model/:id',
            name: 'Model',
            component: Model,
            params: {
                id: ':id',
                model: ':model'
            }
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
