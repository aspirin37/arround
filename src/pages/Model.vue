<template>
    <div class="page">
        <div class="page-container">
            <loader v-if="isLoaderShown"></loader>
            <div class="widget-min-height"
                 v-if="model">
                <div class="d-flex align-items-baseline">
                    <h4 class="px-2 mb-3 mr-auto">Модель:</h4>
                    <span :class="model.is_active ? 'text-success' : 'text-danger' ">{{ model.is_active ? 'Активна' :
                        'Неактивна' }}</span>
                </div>
                <div class="current-shadow rounded bg-white p-4 mb-3">
                    <div class="d-flex flex-column flex-xl-row bg-light-green">
                        <div class="mr-4">
                            <h4 class="pl-4 mb-2"
                                v-if="!isNameInputShown">
                                <a href="#"
                                   class="text-dashed"
                                   @click="showNameInput">{{ newModelName || 'Без имени' }}</a>
                                <small> - ID: {{ model.idt_model }}</small>
                            </h4>
                            <input type="text"
                                   class="form-control form-control-sm mb-2"
                                   v-model="newModelName"
                                   ref="name-input"
                                   v-else>
                            <thumbnails-outer class="">
                                <thumbnail :img="model.modifications[0].url_icon"
                                           :thumb="model.modifications[0].url_icon"
                                           :linkClasses="['circle-avatar circle-avatar--model-info rounded-circle mr-3 bg-light d-inline-block']"
                                           :thumbClasses="['font-size-0']"></thumbnail>
                            </thumbnails-outer>
                        </div>
                        <div class="d-flex flex-column mr-4">
                            <h4>Редактирование:</h4>
                            <label for="priority">Приоритет при показе моделей</label>
                            <input type="number"
                                   step="50"
                                   class="form-control form-control-sm"
                                   v-model="newSortOrder"
                                   @input="isSubmitShown = true"
                                   id="priority">
                        </div>
                        <div class="d-flex flex-column mr-4">
                            <h4>Действия:</h4>
                            <router-link :to="{name: 'AddModif', params: {id: modelId, modelName: model.name, modelPreview: model.modifications[0].url_icon}}"
                                         class="btn btn-sm btn-outline-orange mb-2">Добавить модификацию</router-link>
                            <button class="btn w-100 btn-sm mb-2"
                                    :class="model.is_active ? 'btn-outline-theme' : 'btn-outline-success'"
                                    @click="changeModelStatus"
                                    disabled>
                                {{model.is_active ? 'Деактивировать модель' : 'Активировать модель' }}
                            </button>
                            <button class="btn w-100 btn-sm btn-outline-danger mb-2"
                                    disabled>
                                Удалить модель
                            </button>
                        </div>
                    </div>
                    <div class="d-flex align-items-end mt-4"
                         v-if="isSubmitShown">
                        <button class="btn btn-sm btn-outline-success mr-2"
                                @click="submitChanges">Принять изменения</button>
                        <button class="btn btn-sm btn-outline-secondary"
                                @click="setDefaultValues">Сбросить</button>
                    </div>
                </div>
                <div class="d-flex px-2 justify-content-between">
                    <h4 class="mb-3">Список модификаций:</h4>
                    <h4 class="d-none d-md-block">Всего модификаций: {{ count }}</h4>
                </div>
                <div class="pb-4">
                    <div class="d-flex col-12 mb-3 px-2"
                         v-for="(it, i) in model.modifications"
                         :key="i">
                        <modification :modification="it" />
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
            newModelName: '',
            newSortOrder: null,
            isNameInputShown: false,
            isSubmitShown: false,
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
                this.newModelName = this.model.name || ''
                this.newSortOrder = this.model.sort_order
                this.isLoaderShown = false
            }).catch(err => {
                this.isLoaderShown = false
            })
        },
        showNameInput() {
            this.isNameInputShown = true;
            this.isSubmitShown = true;
            setTimeout(() => {
                this.$refs['name-input'].focus();
            }, 1);
        },
        setDefaultValues() {
            this.newModelName = this.model.name || '';
            this.newSortOrder = this.model.sort_order;
            this.isNameInputShown = false;
            this.isSubmitShown = false;
        },
        submitChanges() {
            this.isSubmitDisabled = true;
            let options = {
                idt_model: +this.modelId,
                name: this.newModelName,
                sort_order: +this.newSortOrder
            }

            this.$http.put(ModelApi.updateModel, options).then(res => {
                this.isSubmitDisabled = false
                this.isSubmitShown = false
                this.isNameInputShown = false
            }).catch((err) => {
                this.isSubmitDisabled = false
            })
        },
        changeModelStatus() {
            let options = {
                idt_model: +this.modelId,
                is_active: !this.model.is_active
            }
            this.$http.put(ModelApi.updateModel, options).then(res => {
                this.model.is_active = !this.model.is_active
            })
        }
    }
}
</script>
<style lang="scss"
       scoped>
button:focus {
    text-decoration: none;
}
</style>