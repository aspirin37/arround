<template>
    <div class="page-container widget-min-height">
        <div class="d-flex align-items-start">
            <div class="widget-min-height w-100 relative">
                <h2 class="px-2">Добавление модели</h2>
                <div class="d-flex col-12 col-xl-6 my-3 px-2">
                    <div class="current-shadow rounded bg-white p-4">
                        <div class="d-flex flex-column flex-xl-row px-4 mb-3 mb-xl-5">
                            <thumbnails-outer class="mr-3">
                                <thumbnail :img="previewSrc"
                                           :thumb="previewSrc"
                                           :linkClasses="['circle-avatar circle-avatar--add-modif rounded-circle bg-light d-inline-block']"
                                           :thumbClasses="['d-flex font-size-0']"></thumbnail>
                            </thumbnails-outer>
                            <div class="d-flex flex-column">
                                <div class="form-group mb-4">
                                    <label class="mb-2">Введите название:</label>
                                    <input type="text"
                                           class="form-control form-control--modif-name"
                                           v-model="newModelName"
                                           ref="model-name-input">
                                </div>
                                <div class="form-group mb-3">
                                    <label class="d-block mb-2">Добавьте превью:</label>
                                    <div>
                                        <button class="btn btn-sm btn-outline-theme mr-2"
                                                @click="clickFileUpload('image-upload')">Выберите файл</button>
                                        <span>{{ newImageFile.name || 'Файл не выбран' }}</span>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label class="d-block mb-2">Добавьте zip-архив:</label>
                                    <div>
                                        <button class="btn btn-sm btn-outline-theme mr-2"
                                                @click="clickFileUpload('zip-upload')">Выберите файл</button>
                                        <span>{{ newZipFile.name || 'Файл не выбран' }}</span>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label class="d-block mb-2">Добавьте sfb-архив:</label>
                                    <div>
                                        <button class="btn btn-sm btn-outline-theme mr-2"
                                                @click="clickFileUpload('sfb-upload')">Выберите файл</button>
                                        <span>{{ newSfbFile.name || 'Файл не выбран' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column flex-xl-row px-4">
                            <button class="btn btn-outline-success mr-xl-2 mb-2"
                                    :disabled="isSubmitDisabled">Добавить модель</button>
                            <button class="btn btn-outline-danger mb-2"
                                    @click="setDefaultValues">Сбросить изменения</button>
                            <button class="btn btn-outline-secondary ml-xl-auto"
                                    @click="$router.go(-1)">Назад</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-none">
            <input type="file"
                   ref="image-upload"
                   accept="image/*"
                   @change="uploadFile('image-upload', $event)" />
            <input type="file"
                   ref="zip-upload"
                   accept="application/zip"
                   @change="uploadFile('zip-upload', $event)" />
            <input type="file"
                   ref="sfb-upload"
                   @change="uploadFile('sfb-upload', $event)" />
        </div>
    </div>
</template>
<script>
import { ModelApi } from '@/services/api'
import { clone } from '@/utils/clone'
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'
export default {
    components: {
        Thumbnail,
        ThumbnailsOuter,
    },
    data() {
        return {
            newModelName: null,
            newZipFile: null,
            newSfbFile: null,
            newImageFile: null,
            defaultFileState: {
                name: '',
                data: null,
                src: null,
            },
            isSubmitLoading: false
        }
    },
    computed: {
        previewSrc() {
            return this.newImageFile && this.newImageFile.src ? this.newImageFile.src : ''
        },
        isSubmitDisabled() {
            return !this.newZipFile.data || !this.newSfbFile.data || !this.newImageFile.data || this.newModelName === '' || this.isSubmitLoading
        }
    },
    created() {
        this.setDefaultValues()
    },
    mounted() {
        this.$refs['model-name-input'].focus()
    },
    methods: {
        uploadFile(id, evt) {
            const file = this.$refs[id].files[0];
            const reader = new FileReader();

            reader.onload = () => {
                switch (id) {
                    case 'zip-upload':
                        this.newZipFile.data = file;
                        this.newZipFile.name = file.name;
                        break;
                    case 'sfb-upload':
                        this.newSfbFile.data = file;
                        this.newSfbFile.name = file.name;
                        break;
                    case 'image-upload':
                        this.newImageFile.src = reader.result;
                        this.newImageFile.name = file.name;
                        this.newImageFile.data = file;
                        break;
                }
                this.isSubmitShown = true
            };

            reader.readAsDataURL(file);
        },
        setDefaultValues() {
            this.newZipFile = clone(this.defaultFileState)
            this.newSfbFile = clone(this.defaultFileState)
            this.newImageFile = clone(this.defaultFileState)
            this.newModelName = ''
            this.isNameInputShown = false
            this.isSubmitShown = false
            document.querySelectorAll('input[type=file]').forEach(it => {
                it.value = ""
            })
        },
        clickFileUpload(id) {
            this.$refs[id].click()
        },
        addModel() {
            this.isSubmitLoading = true;
            let formData = new FormData();
            formData.append('name', this.newModelName);
            formData.append('image', this.newImageFile.data);
            formData.append('archive', this.newZipFile.data);
            formData.append('sfb', this.newSfbFile.data);

            this.$http.post(ModelApi.updateModification, formData).then(() => {
                this.$router.push('/models')
            }).catch(err => {
                this.isSubmitLoading = false
            });
        }
    }
}
</script>
<style lang="scss"
       scoped>
.form-control--modif-name {
    width: 230px;
}
</style>