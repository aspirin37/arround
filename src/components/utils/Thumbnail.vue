<template>
    <div :class="thumbClasses">
        <a href="#"
           @click.prevent="toggleShowThumb"
           :class="linkClasses">
            <img :src="img"
                 alt="">
        </a>
        <transition name="switch-pic">
            <div class="thumb-img"
                 v-if="isShowThumb"
                 v-on:click.prevent="toggleShowThumb"
                 v-on:keyup.esc="escaped">
                <div class="thumb-img__img">
                    <img :src="thumb"
                         alt="">
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'thumbnail',
    props: {
        img: '',
        thumb: '',
        thumbClasses: {
            type: Array,
            default: () => {
                return {
                    default: []
                }
            }
        },
        linkClasses: {
            type: Array,
            default: () => {
                return {
                    default: []
                }
            }
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isShowThumb: false,
            body: document.body
        }
    },
    created() {},
    methods: {
        toggleShowThumb() {
            if (this.thumb) {
                this.isShowThumb = !this.isShowThumb
                this.isShowThumb ? (this.body.className = 'modal-open') : (this.body.className = '')
                if (this.isShowThumb === true && this.index !== null) {
                    this.$parent.$emit('indexSetted', this.index)
                    this.toggleIsShowed(true)
                } else {
                    this.toggleIsShowed(false)
                }
            }
        },
        escaped() {
            this.isShowThumb = false
            this.body.className = ''
            this.$parent.$emit('indexSetted', null)
            this.toggleIsShowed(false)
        },
        toggleIsShowed(val) {
            this.$parent.$emit('isShowed', val)
        }
    }
}
</script>