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
                        <b-nav-item href="#"><i class="fa fa-sign-out-alt"></i> Выйти</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>
<script>
// import { AuthApi } from '@/services/api'
export default {
    name: 'Layout',
    data() {
        return {
            result: null
        }
    },
    // created() {
    //     this.login()
    // },
    // methods: {
    //     async login() {
    //         this.result = await AuthApi.login({
    //             email: 'qq@qq.qq',
    //             password: '123'
    //         })
    //     }
    // }
}
</script>
<style scoped>
</style>