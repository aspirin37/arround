<template>
    <div>
        <navbar />
        <main class="main-content flex-column flex-md-row d-flex align-items-start align-items-md-stretch flex-wrap flex-md-nowrap"
              :class="{'main-content--small' : smallSize, 'chrome-mobile': isMobileChrome}">
            <sidebar v-on:toggleSize="toggleSidebar" />
            <div class="w-100 overflow-hidden">
                <transition name="page"
                            mode="out-in">
                    <router-view />
                </transition>
            </div>
        </main>
    </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default {
    name: 'panel',
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            smallSize: false
        }
    },
    created() {
        alert(/Chrome|crios/i.test(navigator.userAgent))
        alert(navigator.userAgent)
        alert(this.$mq)
    },
    computed: {
        isMobileChrome() {
            return /Chrome|Crios/i.test(navigator.userAgent) && this.$mq == 'sm'
        },

    },
    methods: {
        toggleSidebar() {
            this.smallSize = !this.smallSize
        },
    }
}
</script>