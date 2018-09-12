<template>
    <div>
        <div class="service-bar d-flex align-items-end px-4 py-3 border-bottom">
            <span class="page-heading">Всего пользователей: {{ count }}</span>
            <div class="d-flex align-items-center ml-auto">
                <a href="#"
                   class="dl-excel mr-3"></a>
                <input type="text"
                       style="width: 250px"
                       class="form-control bg-white mr-3"
                       v-model="searchText"
                       @keyup="updateSearch"
                       placeholder="Поиск...">
                <pagination :count="count"
                            :itemsPerPage="itemsPerPage"
                            :pushQuery="true"
                            @pageChanged="getUsers"
                            ref="pagination"></pagination>
            </div>
        </div>
        <div class="page-container">
            <div class="text-center cap"
                 v-if="!count && !isLoaderShown">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Пользователи не найдены</p>
            </div>
            <loader v-if="isLoaderShown"></loader>
            <div class="page-table"
                 v-if="count">
                <div class="d-flex flex-wrap flex-md-nowrap align-items-center px-4 mb-3 position-relative font-weight-bold">
                    <div class="col d-none d-xl-block id-column">ID</div>
                    <div class="col d-none d-xl-block">Дата регистрации</div>
                    <div class="col d-none d-xl-block">Имя</div>
                    <div class="col d-none d-xl-block">Телефон</div>
                    <div class="col d-none d-xl-block">Email</div>
                    <div class="col d-none d-xl-block">Последняя активность</div>
                </div>
                <div class="page-table__body">
                    <span class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 mb-2 cursor-pointer rounded d-flex flex-wrap link-reset"
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
                </div>
                <!-- <pagination :count="count"
                            :itemsPerPage="itemsPerPage"
                            :pushQuery="true"
                            :moreBtn="true"
                            @pageChanged="getUsers"
                            ref="pagination"></pagination> -->
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
        Pagination,
    },
    data() {
        return {
            users: [],
            isLoaderShown: false,
            isFilterShown: false,
            filterOptions: {},
            itemsPerPage: 20,
            count: null,
            searchText: '',
            searchTimout: null,
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
        updateSearch() {
            clearTimeout(this.searchTimout);
            this.searchTimout = setTimeout(() => {
                this.getUsers(0, this.itemsPerPage)
            }, 300);
        },
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

// .id-column {
//     width: auto;

//     @media (min-width: 1200px) {
//         width: 100px !important;
//     }
// }
</style>