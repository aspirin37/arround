<template>
    <header class="d-flex w-100">
        <router-link to="/models"
                     class="navbar-brand admin-logo mr-0 text-center">
            <img src="@/assets/logo.png"
                 alt="logo"
                 class="navbar-logo">
        </router-link>
        <nav class="navbar navbar-dark bg-theme justify-content-between w-100">
            <ul class="navbar-nav flex-row">
                <li class="nav-item">
                    <a href="#"
                       class="nav-link"
                       @click="$router.go(-1)">
                        <i class="fa fa-lg fa-angle-left"></i> Назад
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto flex-row">
                <li class="nav-item">
                    <a href="#"
                       class="nav-link"
                       @click="signOut"><i class="fa fa-sign-out-alt"></i>
                        Выход
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
import clearCookies from '@/utils/clear-cookies'
import { AdminApi } from '@/services/api'

export default {
    name: 'navbar',
    data() {
        return {}
    },
    computed: {},
    watch: {
        '$route'() {
            this.showNavbar = false
        }
    },
    methods: {
        async signOut() {
            await this.$http.delete(AdminApi.signOut)
            this.$router.push({ name: 'SignIn' })
            clearCookies()
        }
    }
}
</script>