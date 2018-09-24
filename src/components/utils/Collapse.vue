<template>
    <div class="w-100 collapse-item cursor-pointer">
        <div class="collapse-item__header pointer"
             @click="itemSelected = !itemSelected">
            <span class="collapse--item__header-text mr-1">{{ collapseHeader }}</span>
            <span :class="[itemSelected ? 'fa-angle-down' : 'fa-angle-right', 'fa ml-2 mr-auto']"></span>
            <slot name="header"></slot>
        </div>
        <transition name="collapse">
            <div class="collapse-item__wrapper"
                 v-show="itemSelected">
                <slot name="main"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemSelected: false
        };
    },
    props: ['collapseHeader', 'collapseContent'],
};
</script>
<style lang="scss"
       scoped>
.collapse-item {
    border-bottom: 1px solid #e5e5e5;

    &__header {
        display: flex;
        align-items: center;
        padding: 10px 0;
        color: #2d9cdb;
        font-size: 16px;
    }

    &__header-text {
        font-weight: 600;
        font-size: 16px;
    }

    &__wrapper {
        overflow: hidden;
        color: #576077;
    }

    &__content {
        padding: 22px 0;
        line-height: 20px;
    }
}

.collapse-enter-active,
.collapse-leave-active {
    transition: max-height 0.5s ease-in-out;
    max-height: 400px;
}

.collapse-enter,
.collapse-leave-to {
    max-height: 0;
}
</style>