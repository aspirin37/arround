<template>
    <div id="app">
        <keep-alive>
            <router-view :key="$route.path" />
        </keep-alive>
    </div>
</template>
<script>
export default {
    name: 'App',
}
</script>
<style lang="scss">
@import './styles/app.scss';
</style>