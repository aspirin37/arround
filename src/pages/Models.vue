<template>
    <div>
        <div class="widget-min-height relative">
            <div class="text-center cap"
                 v-if="!models.length">
                <div class="cap__noresults ml-auto mr-auto"></div>
                <p class="lead cap__text mb-0">Моделей не найдено</p>
            </div>
            <div class="d-flex align-items-start">
                <div class="widget-min-height w-100 relative">
                    <div class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 pt-xl-3 mb-2 rounded d-flex flex-wrap link-reset"
                         :to="{name: 'Model', params: {id: model.idt_model, model }}"
                         v-if="models.length"
                         v-for="(model, i) in models"
                         :key="i">
                        <div class="col-6 col-lg-10  p-0 flex-row">
                            <div class="col-12 col-lg">
                                ID<b> {{ model.idt_model }}</b>
                            </div>
                            <div class="col-12 col-lg">
                                Имя: <b>{{ model.name || 'Без имени' }}</b>
                            </div>
                            <div class="col-12 col-lg">
                                Тип: <b> {{ modelTypes[model.idc_round_type] }}</b>
                            </div>
                            <div class="col-12 col-lg">
                                Модификации: <b> {{ model.modifications.length }}</b>
                            </div>
                        </div>
                        <div class="col-6 col-lg-2 p-0 d-flex align-items-center justify-content-end flex-column flex-lg-row">
                            <router-link :to="{name: 'Model', params: {id: model.idt_model, model }}"
                                         class="btn btn-sm btn-outline-theme mr-2 mb-2 align-top cursor-pointer">Редактировать</router-link>
                            <button class="btn btn-sm btn-outline-danger mr-2 align-top mb-2">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modelTypes from '@/utils/model-types'
import { UserApi } from '@/services/api'
export default {
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
<style lang="scss"
       scoped>
.btn {
    min-width: 105px;

    @media (min-width: 992px) {
        min-width: auto;
    }
}
</style>