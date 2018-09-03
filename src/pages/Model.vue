<template>
    <div>
        <div class="widget-min-height relative">
            <div class="d-flex align-items-start">
                <div class="widget-min-height w-100 relative">
                    <h2>Модель: {{ model.name }}</h2>
                    <h4 class="font-weight-normal">Список модификаций:</h4>
                    <div class="current-shadow rounded bg-white p-3 mb-3"
                         v-for="(it, i) in model.modifications"
                         :key="i">
                        <h5>{{ it.name || 'Без имени' }}</h5>
                        <thumbnails-outer class="mb-3">
                            <thumbnail :img="it.url_icon"
                                       :thumb="it.url_icon"
                                       :linkClasses="['circle-avatar circle-avatar--model rounded-circle mr-3 bg-light d-inline-block']"
                                       :thumbClasses="['font-size-0']"></thumbnail>
                        </thumbnails-outer>
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
export default {
    components: {
        Thumbnail,
        ThumbnailsOuter,
    },
    data() {
        return {

        }
    },
    computed: {
        model() {
            return this.$route.params.model || JSON.parse(localStorage.getItem('model'))
        }
    },
    created() {
        localStorage.setItem('model', JSON.stringify(this.model))
    },
    methods: {}
}
</script>
<style lang="scss">
.circle-avatar--model {
    width: 120px;
    height: 120px;
}
</style>