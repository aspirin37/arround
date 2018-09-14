<template>
    <div>
        <div class="service-bar d-flex flex-wrap align-items-end px-4 py-3 border-bottom">
            <span class="page-heading">Всего пользователей: {{ count }}</span>
            <button class="d-none d-xl-flex btn btn-link ml-auto mr-3">
                Экспорт CSV
                <i class="dl-excel ml-2"></i>
            </button>
            <input type="text"
                   class="d-none d-xl-block form-control form-control--search bg-white mr-3"
                   v-model="searchText"
                   @keyup="updateSearch"
                   placeholder="Поиск...">
            <b-pagination size="md"
                          class="align-self-center mb-0"
                          :total-rows="count"
                          v-model="currentPage"
                          :per-page="limit"
                          @change="getUsers"
                          v-if="count > limit">
            </b-pagination>
        </div>
        <div class="page-container">
            <div class="text-center cap"
                 v-if="!count && !isPageLoaderShown">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Пользователи не найдены</p>
            </div>
            <loader v-if="isPageLoaderShown"></loader>
            <div class="page-table"
                 v-if="count">
                <div class="d-none d-xl-flex flex-wrap flex-md-nowrap align-items-center px-4 mb-3 position-relative font-weight-bold">
                    <div class="col flex-grow-1">ID</div>
                    <div class="col flex-grow-3">Дата регистрации</div>
                    <div class="col flex-grow-3">Имя</div>
                    <div class="col flex-grow-3">Телефон</div>
                    <div class="col flex-grow-3">Email</div>
                    <div class="col flex-grow-3">Последняя активность</div>
                </div>
                <div class="page-table__body"
                     @scroll="onScroll($event, onScrollAction)">
                    <div class="page-table__wrapper">
                        <router-link class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 mb-2 cursor-pointer rounded d-flex flex-wrap link-reset"
                                     :to="{name: 'User', params: {id: user.idt_user, user }}"
                                     v-for="(user, i) in users"
                                     :key="i">
                            <div class="col-12 col-xl flex-grow-1">
                                <span class="d-xl-none">ID: </span>
                                {{user.idt_user}}
                            </div>
                            <div class="col-12 col-xl flex-grow-3">
                                <span class="d-xl-none">Дата регистрации: </span>
                                -
                            </div>
                            <div class="col-12 col-xl flex-grow-3">
                                <span v-if="user.name">{{user.name}}</span>
                                <span v-else>Имя неизвестно</span>
                            </div>
                            <div class="col-12 col-xl flex-grow-3">
                                <span v-if="user.phone">{{user.phone}}</span>
                                <span v-else>Не указан</span>
                            </div>
                            <div class="col-12 col-xl flex-grow-3">
                                <span v-if="user.email">{{user.email}}</span>
                                <span v-else>Не указан</span>
                            </div>
                            <div class="col-12 col-xl flex-grow-3">
                                <span class="d-xl-none">Последняя активность: </span>-
                            </div>
                        </router-link>
                        <loader :isScrollLoader="true"
                                v-if="isScrollLoaderShown"></loader>
                    </div>
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
import onScroll from '@/mixins/on-scroll'
export default {
    mixins: [onScroll],
    components: {
        Loader,
        Thumbnail,
        ThumbnailsOuter,
    },
    data() {
        return {
            users: [],
            isScrollLoaderShown: false,
            isPageLoaderShown: false,
            isFilterShown: false,
            filterOptions: {},
            currentPage: 1,
            limit: 20,
            count: 0,
            searchText: '',
            searchTimout: null,
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.count / this.limit)
        }
    },
    mounted() {
        this.getUsers(this.currentPage, true)
    },
    methods: {
        getUsers(page, isLoaderNeeded, isScrolled) {
            if (isScrolled) this.isScrollLoaderShown = true
            if (isLoaderNeeded) this.isPageLoaderShown = true
            if (!isScrolled && !isLoaderNeeded) document.querySelector('.page-table__body').scrollTo(0, 0)
            let options = {
                offset: this.limit * (page - 1),
                limit: this.limit,
                search: this.searchText
            }
            this.$http.get(UsersApi.getUserList, { params: options }).then(res => {
                this.users = isScrolled ? this.users.concat(res.body.users) : res.body.users
                this.count = res.body.count
                this.currentPage = page

                this.isPageLoaderShown = false
                this.isScrollLoaderShown = false
            }).catch(() => {
                this.isPageLoaderShown = false
                this.isScrollLoaderShown = false
            })
        },
        updateSearch() {
            clearTimeout(this.searchTimout);
            this.searchTimout = setTimeout(() => {
                this.getUsers(this.currentPage)
            }, 300);
        },
        onScrollAction() {
            this.getUsers(this.currentPage + 1, false, true)
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
</style>