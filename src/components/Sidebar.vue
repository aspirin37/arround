<template>
    <aside class="profile-sidebar">
        <div class="profile-nav bg-theme relative clearfix">
            <!-- <ul class="nav flex-md-column nav-pills text-center text-md-left py-md-2 justify-content-start flex-nowrap overflow-x">
        <router-link tag="li" :to="{path: '/main'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--dashboard"></span><span class="d-none d-md-inline-block profile-nav__text">Обзор</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/orders'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--list"></span><span class="d-none d-md-inline-block profile-nav__text">Заказы</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/couriers'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--courier"></span><span class="d-none d-md-inline-block profile-nav__text">Курьеры</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/clients'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--client"></span><span class="d-none d-md-inline-block profile-nav__text">Клиенты</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/support'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--mail"></span><span class="d-none d-md-inline-block profile-nav__text">Обращения</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/payments'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--payments"></span><span class="d-none d-md-inline-block profile-nav__text">Платежи</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/delivery-zones'}" class="nav-item relative py-2 py-md-0" active-class="active" v-if="true">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--zones"></span><span class="d-none d-md-inline-block profile-nav__text">Зоны доставки</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/tariffs'}" class="nav-item relative py-2 py-md-0" active-class="active" v-if="true">
          <a class="nav-link d-flex align-items-center py-3"><span class="tab-icon tab-icon--tariff"></span><span class="d-none d-md-inline-block profile-nav__text">Тарифы</span></a>
        </router-link>
        <router-link tag="li" :to="{path: '/settings'}" class="nav-item relative py-2 py-md-0" active-class="active">
          <a class="nav-link d-flex align-items-center py-3"><span class="d-none d-md-inline-block profile-nav__text">Настройки</span></a>
        </router-link> -->
            </ul>
            <!-- <a href="#" class="toggle-sidebar-cap d-none d-md-block" v-on:click.prevent="toggleCap"></a> -->
            <a href="#"
               class="toggle-sidebar-size d-none d-md-block"
               v-on:click.prevent="$emit('toggleSize')"></a>
        </div>
        <!-- <div class="global-cap" v-if="showCap" v-on:click="toggleCap"></div> -->
    </aside>
</template>
<script>
export default {
    data() {
        return {}
    },
    components: {},
    //   computed: {
    //     showCap () {
    //       return this.$store.state.isCapShowed
    //     }
    //   },
    methods: {
        // toggleCap () {
        //   this.$store.commit('toggleCap')
        // }
    }
}
</script>