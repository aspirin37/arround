<template>
    <div class="loader-container">
        <span class="loading-circle"
              :class="{'scroll-loader': isScrollLoader}"></span>
    </div>
</template>
<script>
export default {
    name: 'loader',
    props: ['isScrollLoader']
}
</script>
<style lang="scss">
.loader-container {
    position: relative;
    display: flex;
    height: 60px;
}

.scroll-loader {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%)
}
</style>