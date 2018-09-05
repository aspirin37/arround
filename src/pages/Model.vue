<template>
    <div class="widget-min-height relative"
         v-if="model">
        <div class="d-flex align-items-start">
            <div class="widget-min-height w-100 relative">
                <h2 class="px-2">{{ model.name }} - ID: {{ model.idt_model }}</h2>
                <h4 class="px-2"
                    v-if="count">
                    <b v-thousands="count"></b>
                    <span v-decl-num="[['модификация', 'модификации', 'модификаций'], count]"></span>
                </h4>
                <div class="d-flex flex-wrap">
                    <modification class="col-12 col-xl-6 mb-3 px-2"
                                  :modification="it"
                                  v-for="(it, i) in model.modifications"
                                  :key="i" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AdminApi } from '@/services/api'
import Modification from '../components/models/Modification'
import Thumbnail from '../components/utils/Thumbnail'
import ThumbnailsOuter from '../components/utils/ThumbnailsOuter'
import Modal from '../components/utils/Modal'
export default {
    components: {
        Modification,
        Thumbnail,
        ThumbnailsOuter,
        Modal
    },
    data() {
        return {
            model: null,
        }
    },
    computed: {
        modelId() {
            return this.$route.params.id || localStorage.getItem('modelId')
        },
        // model() {
        //     // return this.$route.params.model || JSON.parse(localStorage.getItem('model'))
        //     return {
        //         "idt_model": 2,
        //         "idc_round_type": 2,
        //         "name": "cat",
        //         "modifications": [{ "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" },
        //             { "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" },
        //             { "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" },
        //             { "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" }
        //         ]
        //     }
        // },
        count() {
            return this.model.modifications.length
        }
    },
    created() {
        this.getModel()
        localStorage.setItem('modelId', this.modelId)
    },
    methods: {
        getModel() {
            let options = {
                idt_model: this.modelId || localStorage.getItem('modelId')
            }
            this.$http.get(AdminApi.getModel, { params: options }).then(res => {
                this.model = res.body.model
            })
        }
    }
}
</script>
</style>
<style lang="scss">
.circle-avatar--model-info {
    width: 150px;
    height: 150px;
}
</style>
<style lang="scss"
       scoped>
h2::first-letter,
h4::first-letter {
    text-transform: uppercase
}
</style>