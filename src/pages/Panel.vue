<template>
    <div>
        <navbar />
        <main class="main-content flex-column flex-md-row d-flex align-items-start align-items-md-stretch flex-wrap flex-md-nowrap"
              :class="{'main-content--small' : smallSize}">
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
    data() {
        return {
            smallSize: false
        }
    },
    components: {
        Navbar,
        Sidebar
    },
    methods: {
        toggleSidebar() {
            this.smallSize = !this.smallSize
        }
    }
}
</script>