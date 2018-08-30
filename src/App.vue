<template>
    <div id="app">
        <layout v-if="!isLoginPage" />
        <router-view />
    </div>
</template>
<script>
import Layout from '@/components/layout'
export default {
    name: 'App',
    components: {
        Layout
    },
    computed: {
        isLoginPage() {
            return this.$route.path == '/login'
        }
    },
}
</script>
<style>
</style>