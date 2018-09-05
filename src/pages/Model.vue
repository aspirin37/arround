<template>
    <div class="widget-min-height relative">
        <div class="d-flex align-items-start">
            <div class="widget-min-height w-100 relative">
                <h2 class="px-2">{{ model.name }} - ID: {{ model.idt_model }}</h2>
                <h4 class="px-2"
                    v-if="count">
                    <b v-thousands="count"></b>
                    <span v-decl-num="[['модификация', 'модификации', 'модификаций'], count]"></span>
                </h4>
                <div class="d-flex flex-wrap">
                    <div class="col-12 col-xl-6 mb-3 px-2"
                         v-for="(it, i) in model.modifications"
                         :key="i">
                        <div class="current-shadow rounded bg-white p-4">
                            <h4 class="pl-4 mb-3">{{ it.name || 'Без имени' }} - ID: {{ it.idt_model_modif }}</h4>
                            <div class="d-flex flex-column flex-lg-row">
                                <div class="text-center">
                                    <thumbnails-outer class="">
                                        <thumbnail :img="it.url_icon"
                                                   :thumb="it.url_icon"
                                                   :linkClasses="['circle-avatar circle-avatar--model-info rounded-circle mr-3 bg-light d-inline-block']"
                                                   :thumbClasses="['font-size-0']"></thumbnail>
                                    </thumbnails-outer>
                                </div>
                                <div class="d-flex flex-column text-center p-2">
                                    <button class="d-block btn btn-sm btn-outline-theme mb-2">
                                        Изменить zip
                                    </button>
                                    <button class="d-block btn btn-sm btn-outline-theme mb-2">
                                        Изменить sfb
                                    </button>
                                    <button class="d-block btn btn-sm btn-outline-danger mb-auto">Удалить</button>
                                </div>
                                <div class="d-flex flex-row flex-lg-column text-center p-2">
                                    <a class="btn btn--dl btn-sm btn-link mb-2"
                                       :href="it.url_archive">Скачать zip</a>
                                    <a class="btn btn--dl btn-sm btn-link mb-2"
                                       :href="it.url_sfb">Скачать sfb</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { UserApi } from '@/services/api'
import Thumbnail from '../components/utils/Thumbnail'
import ThumbnailsOuter from '../components/utils/ThumbnailsOuter'
import Modal from '../components/utils/Modal'
export default {
    components: {
        Thumbnail,
        ThumbnailsOuter,
        Modal
    },
    data() {
        return {

        }
    },
    computed: {
        model() {
            // return this.$route.params.model || JSON.parse(localStorage.getItem('model'))
            return {
                "idt_model": 2,
                "idc_round_type": 2,
                "name": "cat",
                "modifications": [{ "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" },
                    { "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" },
                    { "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" },
                    { "idt_model_modif": 2, "name": "", "url_icon": "https://devarapi.a3technology.ru/model/cat/cat.png", "url_archive": "https://devarapi.a3technology.ru/model/cat/cat.zip", "url_sfb": "https://devarapi.a3technology.ru/model/cat/cat.sfb" }
                ]
            }
        },
        count() {
            return this.model.modifications.length
        },
    },
    created() {
        localStorage.setItem('model', JSON.stringify(this.model))
    },
    methods: {

    }
}
</script>
<style lang="scss"
       scoped>
.btn {
    width: 100%;

    &--link:focus {
        text-decoration: none !important;
    }

    &--dl {
        width: 100%;

        @media only screen and (max-width: 1198px) {
            width: 50%;
        }
    }
}
</style>
<style lang="scss">
.circle-avatar--model-info {
    width: 150px;
    height: 150px;
}
</style>
<style lang="scss"
       scoped>
h2::first-letter {
    text-transform: uppercase
}
</style>