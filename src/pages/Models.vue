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
                    <div class="current-shadow bg-white p-3 px-xl-4 pt-xl-4 pt-xl-3 mb-2 cursor-pointer rounded d-flex flex-wrap link-reset"
                         v-if="models.length"
                         v-for="(model, i) in models"
                         :key="i">
                        <div class="col-12 col-md">
                            ID<b> {{ model.idt_model }}</b>
                        </div>
                        <div class="col-12 col-md">
                            Имя: <b>{{ model.name }}</b>
                        </div>
                        <div class="col-12 col-md">
                            Тип: <b> {{ modelTypes[model.idc_round_type] }}</b>
                        </div>
                        <div class="col-12 col-md">
                            Модификации: <b> {{ model.modifications.length }}</b>
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
    components: {},
    methods: {
        getModels() {
            this.$http.get(UserApi.getModels).then(res => {
                this.models = res.body.models
            })
        }
    }
}
</script>