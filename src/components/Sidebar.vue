<template>
    <aside class="profile-sidebar">
        <div class="profile-nav bg-theme relative clearfix">
            <ul class="nav flex-md-column nav-pills text-center text-md-left py-md-2 justify-content-start flex-nowrap overflow-x">
                <router-link tag="li"
                             :to="{path: it.path}"
                             class="nav-item relative py-2 py-md-0"
                             active-class="active"
                             v-for="(it, i) in nav"
                             :key="i">
                    <a class="nav-link d-flex align-items-center py-3">
                        <span :class="`tab-icon tab-icon--${it.icon}`"></span>
                        <span class="d-none d-md-inline-block profile-nav__text">{{ it.name }}</span>
                    </a>
                </router-link>
            </ul>
            <a href="#"
               class="toggle-sidebar-size d-none d-md-block"
               v-on:click.prevent="$emit('toggleSize')"></a>
        </div>
    </aside>
</template>
<script>
export default {
    data() {
        return {
            nav: [{
                name: 'Пользователи',
                icon: 'client',
                path: '/users'
            }, {
                name: 'Модели',
                icon: 'dashboard',
                path: '/models'
            }]
        }
    },
}
</script>