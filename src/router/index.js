import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/modules/page'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Page',
        component: Page
    }]
})
