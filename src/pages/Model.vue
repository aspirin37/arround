<template>
    <div>
        <div class="widget-min-height relative">
            <loader v-if="isLoaderShown"></loader>
            <div class="d-flex align-items-start"
                 v-if="model">
                <div class="widget-min-height w-100 relative">
                    <h2 class="px-2">{{ model.name || 'Без имени' }} - ID: {{ model.idt_model }}</h2>
                    <h4 class="px-2 mb-3"
                        v-if="count">
                        <b class="mr-1"
                           v-thousands="count"></b>
                        <span v-decl-num="[['модификация', 'модификации', 'модификаций'], count]"></span>
                        <router-link :to="{name: 'AddModif', params: {id: modelId, modelName: model.name, modelPreview: model.modifications[0].url_icon}}"
                                     class="btn btn-sm btn-orange ml-2">Добавить </router-link>
                    </h4>
                    <div class="d-flex flex-wrap">
                        <div class="d-flex col-12 col-xl-6 mb-3 px-2"
                             v-for="(it, i) in model.modifications"
                             :key="i">
                            <modification :modification="it" />
                        </div>
                    </div>
                </div>
            </div>
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
            return this.model.modifications.length
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