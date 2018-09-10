<template>
    <div>
        <div class="d-flex flex-wrap flex-md-nowrap align-items-center mb-3">
            <span v-if="users.length">
                <b v-thousands="users.length"></b>
                <span v-decl-num="[['пользователь', 'пользователя', 'пользователей'], users.length]"></span>
            </span>
            <a href="#"
               v-on:click.prevent="isFilterShown = !isFilterShown"
               class="text-dark btn btn-link ml-auto">
                Фильтр
                <span class="bg-danger text-white rounded px-2"
                      v-if="Object.values(filterOptions).length">
                    {{Object.values(filterOptions).length}}
                </span>
            </a>
        </div>
        <div class="widget-min-height relative">
            <div class="text-center cap"
                 v-if="!users.length && !isLoaderShown">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Пользователи не найдены</p>
            </div>
            <loader v-if="isLoaderShown"></loader>
            <div class="d-flex align-items-start">
                <div class="widget-min-height relative w-100">
                    <span class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 pt-xl-3 mb-2 cursor-pointer rounded d-flex flex-wrap link-reset"
                          v-if="users.length"
                          v-for="(it, i) in users"
                          :key="i">
                        {{ it }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { UsersApi } from '@/services/api'
import Loader from '@/components/utils/Loader'
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
export default {
    components: {
        Loader,
        Thumbnail,
        ThumbnailsOuter,
    },
    data() {
        return {
            users: [],
            isLoaderShown: false,
            isFilterShown: true,
            filterOptions: {},
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            this.$http.get(UsersApi.getUserList).then(res => {
                this.users = res.body.users
            })
        }
    }
}
</script>