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

        }
    },
    methods: {

    }
}
</script>
<style scoped>
</style>