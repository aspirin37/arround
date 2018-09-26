<template>
    <div class="page">
        <div class="service-bar d-flex flex-wrap align-items-end px-3 px-xl-4 py-3 border-bottom">
            <span class="page-heading d-none d-xl-block">Всего пользователей: {{ count }}</span>
            <button class="d-none d-xl-flex btn btn-link ml-auto mr-3">
                Скачать
                <i class="dl-excel ml-2"></i>
            </button>
            <div class="service-bar__input-wrapper service-bar__input-wrapper--calendar mr-2">
                <input type="text"
                       class="form-control form-control--search bg-white"
                       id="date-picker">
            </div>
            <div class="service-bar__input-wrapper">
                <input type="text"
                       class="form-control form-control--search bg-white"
                       v-model="searchText"
                       @keyup="updateSearch"
                       placeholder="Поиск...">
            </div>
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
                <div class="page-table__header">
                    <div class="col flex-grow-1 cursor-pointer"
                         @click="changeSorting('id_desc')">
                        ID <i :class="[this.sorting.id_desc === true ? 'fa-angle-up' : 'fa-angle-down', 'fa ml-1']"></i>
                    </div>
                    <div class="col flex-grow-3 cursor-pointer"
                         @click="changeSorting('reg_desc')">
                        Дата регистрации <i :class="[this.sorting.reg_desc === true ? 'fa-angle-up' : 'fa-angle-down', 'fa ml-1']"></i>
                    </div>
                    <div class="col flex-grow-3 cursor-pointer"
                         @click="changeSorting('lastname_desc')">
                        Имя <i :class="[this.sorting.lastname_desc === true ? 'fa-angle-up' : 'fa-angle-down', 'fa ml-1']"></i>
                    </div>
                    <div class="col flex-grow-3">Телефон</div>
                    <div class="col flex-grow-3">Email</div>
                    <div class="col flex-grow-3">Последняя активность</div>
                </div>
                <div class="page-table__body"
                     ref="table-body"
                     @scroll="onScroll($event, onScrollAction)">
                    <div class="page-table__wrapper">
                        <router-link class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 mb-2 cursor-pointer rounded d-flex flex-wrap link-reset"
                                     :to="{name: 'User', params: {id: user.idt_user, user }}"
                                     v-for="(user, i) in users"
                                     :key="i">
                            <div class="d-xl-none col-2 p-0">
                                <thumbnail :img="user.avatar || userCap"
                                           :linkClasses="['circle-avatar rounded-circle mr-3 bg-light d-inline-block']"
                                           :thumbClasses="['font-size-0']"></thumbnail>
                            </div>
                            <div class="col-10 col-xl-12 pl-2 pl-xl-0 pr-0 flex-row">
                                <div class="d-none d-xl-block col-12 col-xl flex-grow-1">
                                    <span class="d-xl-none">ID: </span>
                                    {{user.idt_user}}
                                </div>
                                <div class="col-12 col-xl flex-grow-3 date-column">
                                    <span class="d-xl-none">Зарегистрирован:</span>
                                    <span>{{ user.a_time | parseDate }}</span>
                                    <a href="#"
                                       @click.prevent="clickLink('#')"
                                       class="social-link fab fa-vk ml-2"></a>
                                </div>
                                <div class="col-12 col-xl flex-grow-3">
                                    <span class="mr-2"
                                          v-if="user.name">{{user.name}}
                                        <small class="d-xl-none">(#{{user.idt_user}})</small>
                                    </span>
                                    <span v-else>Имя неизвестно</span>
                                </div>
                                <div class="col-12 col-xl flex-grow-3">
                                    <a href="#"
                                       @click.prevent="clickLink(`tel:${user.phone}`)"
                                       v-if="user.phone">{{user.phone}}</a>
                                    <span v-if="!user.phone && $mq !== 'sm'">Не указан</span>
                                </div>
                                <div class="col-12 col-xl flex-grow-3">
                                    <a href="#"
                                       @click.prevent="clickLink(`mailto:${user.email}`)"
                                       v-if="user.email">{{user.email}}</a>
                                    <span v-if="!user.email && $mq !== 'sm'">Не указан</span>
                                </div>
                                <div class="d-none d-xl-block col-xl flex-grow-3">
                                    <span v-if="user.sessions.length">{{ user.sessions[0].a_time | parseDate }} <i class="fab fa-apple text-apple ml-2"></i></span>
                                    <span v-else>-</span>
                                </div>
                            </div>
                        </router-link>
                        <loader :isScrollLoader="true"
                                v-if="isScrollLoaderShown"></loader>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bar px-4 py-2 pb-xl-3 pt-xl-0">
            <span>Показано: {{ shownUsers }} из {{ count }}</span>
            <a href="#"
               class="d-flex d-xl-none">Скачать<i class="dl-excel ml-2"></i></a>
        </div>
    </div>
</template>
<script>
import flatpickr from 'flatpickr';
import Russian from 'flatpickr/dist/l10n/ru';
import { clone } from '@/utils/clone'
import { UsersApi } from '@/services/api'
import Loader from '@/components/utils/Loader'
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
import onScroll from '@/mixins/on-scroll'
import userCap from '@/assets/user-cap.png'
export default {
    name: 'Users',
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
            sorting: {
                id_desc: false,
                lastname_desc: false,
                reg_desc: true,
            },
            order: 'id_desc',
            dateFrom: 0,
            dateTo: 0,
            scrollPosition: 0,
            userCap
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.count / this.limit)
        },
        shownUsers() {
            return this.currentPage < this.totalPages ? this.limit * this.currentPage : this.count
        },
    },
    mounted() {
        this.getUsers(this.currentPage, true)
        this.createDatePickerInstance()
    },
    watch: {
        order() {
            this.getUsers(1)
        }
    },
    methods: {
        getUsers(page, isLoaderNeeded, isScrolled) {
            let table = document.querySelector('.page-table__body')
            if (isScrolled) this.isScrollLoaderShown = true
            if (isLoaderNeeded) this.isPageLoaderShown = true
            if (table && !isScrolled && !isLoaderNeeded) table.scrollTo(0, 0)
            let options = {
                offset: this.limit * (page - 1),
                limit: this.limit,
                search: this.searchText,
                order: this.order,
                date_from: this.dateFrom,
                date_to: this.dateTo
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
                this.getUsers(1)
            }, 300);
        },
        onScrollAction() {
            this.getUsers(this.currentPage + 1, false, true)
        },
        clickLink(url) {
            let link = document.createElement('a');
            link.setAttribute('href', url)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        changeSorting(field) {
            let temp = clone(this.sorting[field])
            for (let it in this.sorting) {
                this.sorting[it] = false
            }
            this.sorting[field] = !temp

            switch (field) {
                case 'id_desc':
                    this.order = this.sorting[field] ? 'id_desc' : 'id_asc'
                    break;
                case 'lastname_desc':
                    this.order = this.sorting[field] ? 'lastname_desc' : 'lastname_asc'
                    break
                case 'reg_desc':
                    this.order = this.sorting[field] ? 'id_desc' : 'id_asc'
                    break
            }
        },
        createDatePickerInstance() {
            flatpickr('#date-picker', {
                // allowInput: this.$mq == 'sm' ? false : true,
                locale: Russian.ru,
                mode: "range",
                dateFormat: this.$mq == 'sm' ? 'd.m.y' : 'd.m.Y',
                onChange: (selectedDates) => {
                    if (selectedDates.length === 2) {
                        this.dateFrom = selectedDates[0].getTime() / 1000
                        this.dateTo = selectedDates[1].getTime() / 1000
                        this.updateSearch()
                    }
                },
            })
        },
    }
}
</script>
<style lang="scss"
       scoped>
.date-column {
    order: 2;
    padding-right: 0;

    & span {
        font-size: 11px;
    }

    @media (min-width: 1200px) {
        order: unset;
        padding-right: 15px;
        // 

        & span {
            font-size: inherit;
        }
    }
}
</style>