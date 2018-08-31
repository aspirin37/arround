<template>
    <div>
        <layout />
        <div class="container">
            <h1 class="text-center">page</h1>
        </div>
    </div>
</template>
<script>
import Layout from '@/components/layout'
import { AdminApi } from '@/services/api'
export default {
    name: 'Panel',
    components: {
        Layout
    },
    data() {
        return {
            result: null
        }
    },
    created() {
        this.testAuth()
    },
    methods: {
        async testAuth() {
            // await this.login()
            await this.getProfile()
        },
        async login() {
            this.result = await AdminApi.login({
                email: 'qq@qq.qq',
                password: '123'
            })
        },
        async getProfile() {
            this.result = await AdminApi.getProfile()
        }
    }
}
</script>
<style scoped>
</style>