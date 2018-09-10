<template>
    <div>
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
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers() {

        }
    }
}
</script>