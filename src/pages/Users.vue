<template>
    <div>
        <div class="d-flex flex-wrap flex-md-nowrap align-items-center mb-3">
            <span v-if="count">
                <b v-thousands="count"></b>
                <span v-decl-num="[['пользователь', 'пользователя', 'пользователей'], count]"></span>
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
                 v-if="!count && !isLoaderShown">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Пользователи не найдены</p>
            </div>
            <loader v-if="isLoaderShown"></loader>
            <div class="d-flex align-items-start">
                <div class="widget-min-height relative w-100">
                    <span class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 pt-xl-3 mb-2 cursor-pointer rounded d-flex flex-wrap link-reset"
                          v-if="count"
                          v-for="(user, i) in users"
                          :key="i">
                        <div class="table-flex-col mb-2">
                            <div>id <b>{{user.idt_user}}</b></div>
                            <small>Зарегистрирован: - </small>
                        </div>
                        <div class="table-flex-col">
                            <b v-if="user.name">{{user.name}}</b>
                            <span v-else>Имя неизвестно</span>
                        </div>
                        <div class="table-flex-col">
                            <div>{{user.phone}}</div>
                            <div>{{user.email}}</div>
                            <div v-if="!user.phone && !user.email"></div>
                        </div>
                    </span>
                    <pagination :count="count"
                                :itemsPerPage="itemsPerPage"
                                :pushQuery="true"
                                :moreBtn="true"
                                @pageChanged="getUsers"
                                ref="pagination"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { UsersApi } from '@/services/api'
import Loader from '@/components/utils/Loader'
import Pagination from '@/components/utils/Pagination'
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
export default {
    components: {
        Loader,
        Thumbnail,
        ThumbnailsOuter,
        Pagination
    },
    data() {
        return {
            users: [],
            isLoaderShown: false,
            isFilterShown: true,
            filterOptions: {},
            itemsPerPage: 7,
            count: null,
        }
    },
    created() {
        this.getUsers(0, this.itemsPerPage, false, true)
    },
    methods: {
        getUsers(offset, limit, addMore, isLoaderNeeded) {
            if (isLoaderNeeded) this.isLoaderShown = true
            let options = {
                offset: offset || 0,
                limit: this.itemsPerPage
            }
            this.$http.get(UsersApi.getUserList, { params: options }).then(res => {
                this.users = addMore ? this._.union(this.users, res.body.users) : res.body.users
                this.count = res.body.count
                this.isLoaderShown = false
            }).catch(() => {
                this.isLoaderShown = false
            })
        },
    }
}
</script>