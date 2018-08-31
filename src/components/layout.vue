<template>
    <div>
        <b-navbar toggleable="md"
                  type="dark"
                  variant="dark">
            <div class="container">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand href="#"
                                class="d-flex align-items-center">
                    <span>ARROUND</span>
                </b-navbar-brand>
                <b-collapse is-nav
                            id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item href="#">Ссылка</b-nav-item>
                        <b-nav-item href="#">Еще ссылка</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item @click="signOut"><i class="fa fa-sign-out-alt"></i> Выйти</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>
<script>
import { AdminApi } from '@/services/api'
export default {
    name: 'Layout',
    data() {
        return {

        }
    },
    methods: {
        signOut() {
            this.$http.delete(AdminApi.signOut).then(() => {
                this.$router.push('sign-in')
            })
        }
    }
}
</script>
<style scoped>
</style>