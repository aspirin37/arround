<template>
    <div class="page-container">
        <loader v-if="isLoaderShown"></loader>
        <div class="d-flex flex-column current-shadow rounded bg-white d-flex p-4 mb-4"
             v-if="user">
            <div class="d-flex justify-content-start flex-wrap mb-3">
                <thumbnails-outer class="mb-3 mr-4">
                    <thumbnail :img="user.avatar || userCap"
                               :thumb="user.avatar || userCap"
                               :linkClasses="['circle-avatar circle-avatar--user-info rounded-circle mr-3 bg-light d-inline-block']"
                               :thumbClasses="['font-size-0']"></thumbnail>
                </thumbnails-outer>
                <div class="mr-md-4 pr-md-4">
                    <h4 class="mb-0 mt-2">{{user.name}}</h4>
                    <div class="mb-3">Статус</div>
                    <div><a :href="`tel:${user.phone}`">{{ user.phone }}</a></div>
                    <div class="mb-3"><a :href="`mailto:${user.email}`">{{ user.email }}</a></div>
                </div>
                <div class="user-dates d-flex d-md-block">
                    <div class="mr-4">
                        <div>Дата регистрации:</div>
                        <div class="mb-2">{{ user.a_time | parseDate }}
                            <a href="#"
                               class="social-link fab fa-vk ml-2"></a>
                        </div>
                    </div>
                    <div>
                        <div>Последняя активность: </div>
                        <ul v-if="user.sessions.length">
                            <li v-for="(it, i) in user.sessions"
                                :key="i"
                                v-if="user.sessions.length && i < 5">
                                {{ it.a_time | parseDate }}
                                <i class="fab fa-apple text-apple ml-2"></i>
                            </li>
                        </ul>
                        <div v-else>Не зарегистрирована</div>
                    </div>
                </div>
            </div>
            <user-note-about class="mb-3"
                             :currentNote="''"
                             :title="'Заметка о пользователе'"></user-note-about>
            <div>
                <button class="btn btn-outline-theme mb-2"
                        :class="{'active': tabSelected == 0}"
                        @click="tabSelected = 0">Список друзей</button>
                <button class="btn btn-outline-theme  mb-2"
                        :class="{'active': tabSelected == 1}"
                        @click="tabSelected = 1">Раунды</button>
                <button class="btn btn-outline-theme mb-2"
                        :class="{'active': tabSelected == 2}"
                        @click="tabSelected = 2">Жалобы на пользователя</button>
                <button class="btn btn-outline-theme mb-2"
                        :class="{'active': tabSelected == 3}"
                        @click="tabSelected = 3">Жалобы от пользователя</button>
                <button class="btn btn-outline-danger mr-2 align-top mb-2"
                        @click="toggleModal('ban-client')"
                        disabled>Заблокировать</button>
            </div>
        </div>
        <div class="tabs-content d-flex flex-column current-shadow rounded bg-white d-flex p-4 mb-4">
            <transition name="fade"
                        mode="out-in">
                <div key="0"
                     v-if="tabSelected == 0">
                    Список друзей
                </div>
                <div key="1"
                     v-if="tabSelected == 1">
                    Список раундов
                </div>
                <div key="2"
                     v-if="tabSelected == 2">
                    Жалобы на пользователя
                </div>
                <div key="3"
                     v-if="tabSelected == 3">
                    Жалобы от пользователя
                </div>
            </transition>
        </div>
        <modal modalSize="modal-xs"
               modalTitle="Вы уверены?"
               ref="ban-client">
            <div slot="modalBody">
                <button class="btn btn-theme w-100"
                        @click="blockUser"
                        type="button">Да</button>
            </div>
        </modal>
    </div>
</template>
<script>
import Thumbnail from '@/components/utils/Thumbnail'
import Collapse from '@/components/utils/Collapse';
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
import Loader from '@/components/utils/Loader'
import Modal from '@/components/utils/Modal'
import UserNoteAbout from '@/components/users/UserNoteAbout'
import userCap from '@/assets/user-cap.png'

export default {
    components: {
        Collapse,
        Thumbnail,
        ThumbnailsOuter,
        Loader,
        UserNoteAbout,
        Modal
    },
    data() {
        return {
            tabSelected: 0,
            isLoaderShown: false,
            user: this.$route.params.user,
            userCap
        }
    },
    methods: {
        toggleModal(id) {
            this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
        },
        blockUser() {
            let options = {
                // idt_user: this.clientId,
                // idc_client_status: 3
            }
            //   this.$http.put(api.API_LINK + 'clients', options).then(() => {
            this.toggleModal('ban-client')
            // this.getClient()
            //   }, response => {
            //     this.errorMessage = response.data.message
            //   })
        }
    }
}
</script>
<style lang="scss"
       scoped>
ul {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

.user-dates {
    flex-grow: 1;
    font-size: 12px;

    @media (min-width: 768px) {
        font-size: 14px;
    }
}

.tabs-content {
    min-height: 400px;
}
</style>