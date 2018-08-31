<template>
    <div class="d-flex align-items-center vh-100 container-fluid">
        <div class="mx-auto w-100 sign-form current-shadow bg-white rounded mb-3">
            <div class="text-center bg-theme rounded-top px-4 py-3">
                <img src="@/assets/logo.png"
                     width="150"
                     class="my-2"
                     alt="logo">
            </div>
            <form v-on:submit.prevent="signIn"
                  class="px-5 pt-4 pb-3">
                <div class="form-group">
                    <input type="email"
                           name="email"
                           class="form-control"
                           v-model="email"
                           placeholder="E-mail"
                           autocomplete="email"
                           required>
                </div>
                <div class="form-group relative">
                    <input :type="`${showPassword ? 'text' : 'password'}`"
                           name="password"
                           class="form-control"
                           v-model="pass"
                           placeholder="Пароль"
                           required>
                    <a href="#"
                       class="show-password"
                       tabindex="-1"
                       v-bind:class="{'show-password--hide' : !showPassword}"
                       v-on:click.prevent="showPassword = !showPassword"></a>
                </div>
                <div class="form-group">
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
            showPassword: false
        }
    },
    methods: {
        signIn() {
            let options = {
                email: this.email,
                password: this.pass
            }
            this.$http.post(AdminApi.signIn, options).then(() => {
                this.$router.push({ name: 'Panel' })
            }).catch((err) => {
                this.errorMessage = err.body.messages[0]
            })
        },
    }
}
</script>
<style scoped>
</style>