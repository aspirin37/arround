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
                    <button class="btn btn-sm btn-orange"
                            @click.prevent="isAddPanelShown = true"
                            :disabled="isAddPanelShown">Добавить</button>
                </h4>
                <div class="d-flex flex-wrap">
                    <div class="d-flex col-12 col-xl-6 mb-3 px-2"
                         v-if="isAddPanelShown">
                        <div class="flex-grow-1 current-shadow current-shadow--orange rounded bg-white p-4">
                        </div>
                    </div>
                    <div class="d-flex col-12 col-xl-6 mb-3 px-2"
                         v-for="(it, i) in model.modifications"
                         :key="i">
                        <modification @update-model="getModel"
                                      :modification="it" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AdminApi } from '@/services/api'
import Modification from '../components/models/Modification'
export default {
    components: {
        Modification,
    },
    data() {
        return {
            model: null,
            isAddPanelShown: false,
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

button:focus {
    text-decoration: none;
}
</style>