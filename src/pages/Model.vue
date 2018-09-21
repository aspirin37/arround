<template>
    <div>
        <div class="service-bar d-flex flex-wrap align-items-end px-3 px-xl-4 py-3 border-bottom"
             v-if="model">
            <div class="page-heading">Список модификаций для {{ model.name || 'Без имени' }} <small>(#{{ model.idt_model }})</small>:
            </div>
            <div class="service-bar__input-wrapper ml-auto">
                <input type="text"
                       class="d-none d-xl-block form-control form-control--search bg-white"
                       placeholder="Поиск...">
            </div>
            <router-link :to="{name: 'AddModif', params: {id: modelId, modelName: model.name, modelPreview: model.modifications[0].url_icon}}"
                         class="btn btn-orange ml-2">Добавить модификацию</router-link>
            <button class="btn  btn-outline-danger ml-2"
                    @click.prevent>Удалить модель</button>
        </div>
        <div class="page-container">
            <loader v-if="isLoaderShown"></loader>
            <div class="widget-min-height"
                 v-if="model">
                <!-- <h2 class="px-2">{{ model.name || 'Без имени' }} - ID: {{ model.idt_model }}</h2> -->
                <!-- <h4 class="px-2 mb-3"
                v-if="count">
                <b class="mr-1"
                   v-thousands="count"></b>
                <span v-decl-num="[['модификация', 'модификации', 'модификаций'], count]"></span>
                <router-link :to="{name: 'AddModif', params: {id: modelId, modelName: model.name, modelPreview: model.modifications[0].url_icon}}"
                             class="btn btn-sm btn-orange ml-2">Добавить </router-link>
            </h4> -->
                <div class="d-flex flex-wrap">
                    <div class="d-flex col-12 col-xl-6 mb-3 px-2"
                         v-for="(it, i) in model.modifications"
                         :key="i">
                        <modification :modification="it" />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bar px-4 py-2 pb-xl-3 pt-xl-0">
            <span>Показано модификаций: {{ count }} из {{ count }}</span>
        </div>
    </div>
</template>
<script>
import { ModelApi } from '@/services/api'
import Modification from '@/components/models/Modification'
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
import Loader from '@/components/utils/Loader'
export default {
    components: {
        Modification,
        Thumbnail,
        ThumbnailsOuter,
        Loader
    },
    data() {
        return {
            model: null,
            isLoaderShown: false,
        }
    },
    computed: {
        modelId() {
            return this.$route.params.id || localStorage.getItem('modelId')
        },
        count() {
            return this.model ? this.model.modifications.length : 0
        }
    },
    created() {
        this.getModel()
        localStorage.setItem('modelId', this.modelId)
    },
    mounted() {
        this.$on('update-model', function() {
            this.getModel()
        })
    },
    methods: {
        getModel() {
            this.isLoaderShown = true
            let options = {
                idt_model: this.modelId || localStorage.getItem('modelId')
            }
            this.$http.get(ModelApi.getModel, { params: options }).then(res => {
                this.model = res.body.model
                this.isLoaderShown = false
            }).catch(err => {
                this.isLoaderShown = false
            })
        }
    }
}
</script>
<style lang="scss"
       scoped>
h2::first-letter,
h4::first-letter {
    text-transform: uppercase
}

button:focus {
    text-decoration: none;
}
</style>