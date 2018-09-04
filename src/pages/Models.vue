<template>
    <div>
        <div class="widget-min-height relative">
            <div class="text-center cap"
                 v-if="!models.length">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Модели не найдены</p>
            </div>
            <div class="d-flex align-items-start">
                <div class="widget-min-height w-100 relative">
                    <router-link class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 pt-xl-3 mb-2 rounded d-flex flex-wrap link-reset cursor-pointer"
                                 :to="{name: 'Model', params: {id: model.idt_model, model }}"
                                 v-if="models.length"
                                 v-for="(model, i) in models"
                                 :key="i">
                        <div class="d-flex justify-content-center justify-content-lg-start align-items-center col-6 col-lg-2 p-0">
                            <thumbnails-outer>
                                <thumbnail :img="model.modifications[0].url_icon"
                                           :thumb="model.modifications[0].url_icon"
                                           :linkClasses="['circle-avatar circle-avatar--model rounded-circle mr-3 bg-light d-inline-block']"
                                           :thumbClasses="['font-size-0']"></thumbnail>
                            </thumbnails-outer>
                        </div>
                        <div class="col-6 col-lg-10  p-0 flex-row align-items-center">
                            <div class="col-12 col-lg">
                                Имя: <b>{{ model.name || 'Без имени' }} </b>
                                <!-- (ID<b> {{ model.idt_model }}</b>) -->
                            </div>
                            <div class="col-12 col-lg">
                                ID:<b> {{ model.idt_model }}</b>
                            </div>
                            <!-- <div class="col-12 col-lg">
                                Тип: <b> {{ modelTypes[model.idc_round_type] }}</b>
                            </div> -->
                            <div class="col-12 col-lg">
                                Модификации: <b> {{ model.modifications.length }}</b>
                            </div>
                            <div class="col-12 col-lg">
                                <button class="btn btn-sm btn-outline-danger mt-2 mt-lg-0 ml-auto"
                                        @click.prevent>Удалить</button>
                            </div>
                        </div>
                        <!-- <div class="col-12 col-lg-2 p-0 d-flex align-items-center mt-3 mt-lg-0 flex-column flex-xl-row"> -->
                        <!-- <router-link :to="{name: 'Model', params: {id: model.idt_model, model }}"
                                         class="btn btn-sm btn-outline-theme mr-2 mb-2 align-top cursor-pointer">Подробнее</router-link> -->
                        <!-- <button class="btn btn-sm btn-outline-danger mr-2 align-top mb-2"
                                    @click.prevent>Удалить</button> -->
                        <!-- </div> -->
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modelTypes from '@/utils/model-types'
import { UserApi } from '@/services/api'
import Thumbnail from '../components/utils/Thumbnail'
import ThumbnailsOuter from '../components/utils/ThumbnailsOuter'
export default {
    components: {
        Thumbnail,
        ThumbnailsOuter,
    },
    data() {
        return {
            models: [],
            modelTypes
        }
    },
    created() {
        this.getModels()
    },
    methods: {
        getModels() {
            this.$http.get(UserApi.getModels).then(res => {
                this.models = res.body.models
            })
        }
    }
}
</script>
<style lang="scss">
.circle-avatar--model {
    width: 100px;
    height: 100px;
}
</style>
<style lang="scss"
       scoped>
.btn {
    width: 100px;
}
</style>