import Vue from 'vue'
import Router from 'vue-router'
import Panel from '@/pages/Panel'
import SignIn from '@/pages/SignIn'
import Models from '@/pages/Models'
import Model from '@/pages/Model'
import AddModif from '@/pages/AddModif'
import AddModel from '@/pages/AddModel'
import Users from '@/pages/Users'
import User from '@/pages/User'

Vue.use(Router)

const router = new Router({
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
        redirect: '/users',
        component: Panel,
        children: [{
            path: 'models',
            name: 'Models',
            component: Models
        }, {
            path: 'models/add-model',
            name: 'AddModel',
            component: AddModel
        }, {
            path: 'models/model/:id',
            name: 'Model',
            component: Model,
        }, {
            path: 'models/model/:id/add-modif',
            name: 'AddModif',
            component: AddModif
        }, {
            path: 'users',
            name: 'Users',
            component: Users
        }, {
            path: 'users/user/:id',
            name: 'User',
            component: User,
            meta: {
                keepScroll: true
            }
        }]
    }, {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    }, {
        path: '*',
        redirect: '/users',
        name: '404',
    }, ]
})

router.beforeEach((to, from, next) => {
    let tableBody = document.querySelector('.page-table__body')
    if(tableBody) from.meta.scrollPosition = tableBody.scrollTop
    next()
})

router.afterEach((to, from) => {
    if(from.meta.keepScroll && to.meta.scrollPosition) {
        setTimeout(() => {
            document.querySelector('.page-table__body').scrollTo(0, to.meta.scrollPosition);
        }, 100)
    } else {
        to.meta.scrollPosition = 0
    }
})

export default router
