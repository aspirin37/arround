<template>
    <div class="page">
        <div class="service-bar d-flex flex-wrap align-items-end px-4 py-3 border-bottom">
            <span class="page-heading">Всего моделей: {{ models.length }}</span>
            <div class="service-bar__input-wrapper ml-auto">
                <input type="text"
                       class="d-none d-xl-block form-control form-control--search bg-white ml-auto"
                       v-model="searchText"
                       @keyup="updateSearch"
                       placeholder="Поиск...">
            </div>
            <button class="btn btn-outline-orange ml-2"
                    disabled>Добавить модель</button>
        </div>
        <div class="page-container">
            <div class="text-center cap"
                 v-if="!models || !models.length && !isLoaderShown">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Модели не найдены</p>
            </div>
            <loader v-if="isLoaderShown"></loader>
            <div class="page-table"
                 v-if="models && models.length">
                <div class="d-none d-lg-flex px-4 mb-3 font-weight-bold">
                    <div class="col-2">Превью</div>
                    <div class="col-10 p-0 display-flex flex-row">
                        <div class="col">Имя</div>
                        <div class="col">ID</div>
                        <div class="col">Приоритет</div>
                        <div class="col text-lg-center">Кол-во модификаций</div>
                    </div>
                </div>
                <div class="page-table__body">
                    <div class="page-table__wrapper">
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
                                    {{ model.name || 'Без имени' }}
                                </div>
                                <div class="col-12 col-lg">
                                    <span class="d-lg-none">ID:</span> {{ model.idt_model }}
                                </div>
                                <div class="col-12 col-lg">
                                    <span class="d-lg-none">Приоритет:</span> {{ model.sort_order }}
                                </div>
                                <div class="d-none d-lg-block col-lg text-lg-center">
                                    {{ model.modifications.length }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bar px-4 py-2 pb-xl-3 pt-xl-0">
            <span>Показано: {{ count }}</span>
        </div>
    </div>
</template>
<script>
import modelTypes from '@/utils/model-types'
import { ModelApi } from '@/services/api'
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
            searchText: '',
            modelTypes
        }
    },
    computed: {
        count() {
            return this.models.length || 0
        }
    },
    created() {
        this.getModels()
    },
    methods: {
        getModels() {
            this.isLoaderShown = true
            this.$http.get(ModelApi.getModels).then(res => {
                this.models = res.body.models
                this.isLoaderShown = false
            }).catch(err => {
                this.isLoaderShown = false
            })

        },
        updateSearch() {},
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
.page-table .btn {
    width: 100px;
}
</style>