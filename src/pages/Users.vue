<template>
    <div>
        <div class="d-flex flex-wrap flex-md-nowrap align-items-center p-4 position-relative font-weight-bold">
            <div class="col d-none d-xl-block id-column">ID</div>
            <div class="col d-none d-xl-block">Дата регистрации</div>
            <div class="col d-none d-xl-block">Имя</div>
            <div class="col d-none d-xl-block">Телефон</div>
            <div class="col d-none d-xl-block">Email</div>
            <div class="col d-none d-xl-block">Последняя активность</div>
            <div class="filter-table-container d-flex"
                 :class="{'filter-table-container--filter-shown': isFilterShown}">
                <a href="#"
                   v-on:click.prevent="isFilterShown = !isFilterShown"
                   class="filter-btn text-dark btn btn-link font-weight-normal">
                    Фильтр
                </a>
            </div>
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
                        <div class="col-12 col-xl id-column">
                            <span class="d-xl-none">ID: </span>
                            {{user.idt_user}}
                        </div>
                        <div class="col-12 col-xl">
                            <span class="d-xl-none">Дата регистрации: </span>
                            -
                        </div>
                        <div class="col-12 col-xl">
                            <span v-if="user.name">{{user.name}}</span>
                            <span v-else>Имя неизвестно</span>
                        </div>
                        <div class="col-12 col-xl">
                            <span v-if="user.phone">{{user.phone}}</span>
                            <span v-else>Не указан</span>
                        </div>
                        <div class="col-12 col-xl">
                            <span v-if="user.email">{{user.email}}</span>
                            <span v-else>Не указан</span>
                        </div>
                        <div class="col-12 col-xl">
                            <span class="d-xl-none">Последняя активность: </span>-
                        </div>
                    </span>
                    <pagination :count="count"
                                :itemsPerPage="itemsPerPage"
                                :pushQuery="true"
                                :moreBtn="true"
                                @pageChanged="getUsers"
                                ref="pagination"></pagination>
                </div>
                <search-filter v-show="isFilterShown"
                               @search-updated="updateSearchOptions" />
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
import SearchFilter from '@/components/utils/SearchFilter'
export default {
    components: {
        Loader,
        Thumbnail,
        ThumbnailsOuter,
        Pagination,
        SearchFilter
    },
    data() {
        return {
            users: [],
            isLoaderShown: false,
            isFilterShown: false,
            filterOptions: {},
            itemsPerPage: 9,
            count: null,
            searchText: '',
        }
    },
    created() {
        this.getUsers(0, this.itemsPerPage, false, true)
    },
    watch: {
        searchText() {
            this.getUsers(0, this.itemsPerPage, false)
        }
    },
    methods: {
        getUsers(offset, limit, addMore, isLoaderNeeded) {
            if (isLoaderNeeded) this.isLoaderShown = true
            let options = {
                offset: offset || 0,
                limit: this.itemsPerPage,
                search: this.searchText || null
            }
            this.$http.get(UsersApi.getUserList, { params: options }).then(res => {
                this.users = addMore ? this._.union(this.users, res.body.users) : res.body.users
                this.count = res.body.count
                this.isLoaderShown = false
            }).catch(() => {
                this.isLoaderShown = false
            })
        },
        updateSearchOptions(options) {
            this.searchText = options
        }
    }
}
</script>
<style lang="scss">
.filter-table-container {
    position: absolute;
    height: 21px;
    right: 0;
    margin-left: 1rem;
    width: 240px;

    &--filter-shown {
        position: relative;
        right: -1.5rem;
    }
}

.filter-btn {
    position: absolute;
    right: 0;

    bottom: -9px;
}

.id-column {
    width: auto;

    @media (min-width: 1200px) {
        width: 100px !important;
    }

    ;
}
</style>