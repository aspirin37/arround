<template>
    <div class="d-flex align-items-center vh-100 container-fluid">
        <div class="mx-auto w-100 sign-form current-shadow bg-white rounded mb-3">
            <div class="text-center bg-theme rounded-top p-4">
                <h1 class="h3 m-0 text-light">Авторизация</h1>
            </div>
            <form v-on:submit.prevent="signIn"
                  v-if="isSignShowed"
                  class="px-5 py-4">
                <div class="form-group">
                    <input type="email"
                           name="email"
                           class="form-control"
                           v-model="email"
                           placeholder="Email"
                           autocomplete="email"
                           required>
                </div>
                <div class="form-group relative">
                    <input :type="`${showPassword ? 'text' : 'password'}`"
                           name="password"
                           class="form-control"
                           v-model="pass"
                           placeholder="Password"
                           required>
                    <a href="#"
                       class="show-password"
                       tabindex="-1"
                       v-bind:class="{'show-password--hide' : !showPassword}"
                       v-on:click.prevent="showPassword = !showPassword"></a>
                </div>
                <div class="form-group mb-0">
                    <button class="btn btn-theme btn-block"
                            type="submit">Войти</button>
                </div>
                <span class="text-danger d-block text-center">{{errorMessage}}</span>
            </form>
        </div>
    </div>
</template>
<script>
import { AdminApi } from '@/services/api'
export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            pass: '',
            errorMessage: '',
            isSignShowed: true,
            isPasswordSended: false,
            showPassword: false
        }
    },
    methods: {
        async signIn() {
            await AdminApi.login({
                email: this.email,
                password: this.pass
            })
            this.$router.push({ name: 'Panel' })
        },
    }
}
</script>
<style scoped>
</style>