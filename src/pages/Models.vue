<template>
    <div>
        <div class="widget-min-height relative">
            <div class="text-center cap"
                 v-if="!models.length && !isLoaderShown">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Модели не найдены</p>
            </div>
            <loader v-if="isLoaderShown"></loader>
            <div class="d-flex align-items-start">
                <div class="widget-min-height w-100 relative"
                     v-if="models.length">
                    <div class="d-none d-lg-flex p-4">
                        <div class="col-2">Превью</div>
                        <div class="col-10 p-0 display-flex flex-row">
                            <div class="col">Имя</div>
                            <div class="col">ID</div>
                            <div class="col text-lg-center">Кол-во модификаций</div>
                            <div class="col text-lg-center">Действия</div>
                        </div>
                    </div>
                    <router-link class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 pt-xl-3 mb-2 rounded d-flex flex-wrap link-reset cursor-pointer"
                                 :to="{name: 'Model', params: {id: model.idt_model }}"
                                 v-for="(model, i) in models"
                                 :key="i">
                        <div class="d-flex justify-content-center justify-content-lg-start align-items-center col-6 col-lg-2">
                            <thumbnails-outer>
                                <thumbnail :img="model.modifications[0].url_icon"
                                           :thumb="model.modifications[0].url_icon"
                                           :linkClasses="['circle-avatar circle-avatar--model rounded-circle mr-3 bg-light d-inline-block']"
                                           :thumbClasses="['font-size-0']"></thumbnail>
                            </thumbnails-outer>
                        </div>
                        <div class="col-6 col-lg-10 p-0 flex-row align-items-center">
                            <div class="col-12 col-lg">
                                <b>{{ model.name || 'Без имени' }} </b>
                            </div>
                            <div class="col-12 col-lg">
                                <span class="d-lg-none">ID:</span><b> {{ model.idt_model }}</b>
                            </div>
                            <div class="d-none d-lg-block col-lg text-lg-center">
                                <b> {{ model.modifications.length }}</b>
                            </div>
                            <div class="col-12 col-lg text-lg-center">
                                <button class="btn btn-sm btn-outline-danger mt-2 mt-lg-0 ml-auto"
                                        @click.prevent
                                        disabled>Удалить</button>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modelTypes from '@/utils/model-types'
import { UserApi } from '@/services/api'
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
import Loader from '@/components/utils/Loader'
export default {
    components: {
        Loader,
        Thumbnail,
        ThumbnailsOuter,
    },
    data() {
        return {
            models: [],
            isLoaderShown: false,
            modelTypes
        }
    },
    created() {
        this.getModels()
    },
    methods: {
        getModels() {
            this.isLoaderShown = true
            this.$http.get(UserApi.getModels).then(res => {
                this.models = res.body.models
                this.isLoaderShown = false
            }).catch(err => {
                this.isLoaderShown = false
            })

        }
    }
}
</script>
<style lang="scss">
.circle-avatar--model {
    width: 90px;
    height: 90px;

    @media (min-width: 1200px) {
        width: 50px;
        height: 50px;
    }
}
</style>
<style lang="scss"
       scoped>
.btn {
    width: 100px;
}
</style>