<template>
    <div class="page-container">
        <loader v-if="isLoaderShown"></loader>
        <div class="d-flex flex-column current-shadow rounded bg-white d-flex col-12 col-xl-6 p-4"
             v-if="user">
            <div class="d-flex mb-3">
                <thumbnails-outer class="mb-3">
                    <thumbnail :img="user.avatar || userCap"
                               :thumb="user.avatar || userCap"
                               :linkClasses="['circle-avatar circle-avatar--user-info rounded-circle mr-3 bg-light d-inline-block']"
                               :thumbClasses="['font-size-0']"></thumbnail>
                </thumbnails-outer>
                <div>
                    <h4 class="mb-0 mt-2 text-nowrap">{{user.name}}</h4>
                    <div class="mb-3">Статус</div>
                    <div><a :href="`tel:${user.phone}`">{{ user.phone }}</a></div>
                    <div class="mb-3"><a :href="`mailto:${user.email}`">{{ user.email }}</a></div>
                    <div>Дата регистрации: </div>
                    <div>Последняя активность: </div>
                </div>
            </div>
            <user-note-about class="mb-3"
                             :currentNote="''"
                             :title="'Заметка о пользователе'"></user-note-about>
        </div>
    </div>
</template>
<script>
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
import Loader from '@/components/utils/Loader'
import UserNoteAbout from '@/components/users/UserNoteAbout'
import userCap from '@/assets/user-cap.png'
export default {
    components: {
        Thumbnail,
        ThumbnailsOuter,
        Loader,
        UserNoteAbout
    },
    data() {
        return {
            isLoaderShown: false,
            user: this.$route.params.user,
            userCap
        }
    },
    created() {
        console.log(this.$route.params.user)
    }
}
</script>