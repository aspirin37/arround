<template>
    <form class="widget-min-height relative"
          @submit.prevent="addModif">
        <div class="d-flex align-items-start">
            <div class="widget-min-height w-100 relative">
                <h2 class="px-2">{{ modelName }} - ID: {{ modelId }}</h2>
                <h4 class="px-2">Добавление модификации</h4>
                <div class="d-flex col-12 col-xl-6 my-3 px-2">
                    <div class="flex-grow-1 current-shadow rounded bg-white p-4">
                        <div class="d-flex flex-column flex-xl-row">
                            <thumbnails-outer class="mr-3">
                                <thumbnail :img="modelPreview"
                                           :thumb="modelPreview"
                                           :linkClasses="['circle-avatar circle-avatar--add-modif rounded-circle mr-3 bg-light d-inline-block']"
                                           :thumbClasses="['font-size-0']"></thumbnail>
                            </thumbnails-outer>
                            <div class="d-flex flex-column">
                                <div class="form-group">
                                    <label class="mb-2">Введите название:</label>
                                    <input type="text"
                                           class="form-control mb-3"
                                           placeholder="Новая модификация..."
                                           v-model="newModificationName"
                                           autofocus>
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
    </form>
</template>
<script>
import { AdminApi } from '@/services/api'
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
            newModificationName: null,
            newZipFile: null,
            newSfbFile: null,
            newImageFile: null,
            defaultFileState: {
                name: '',
                data: null,
                src: null,
            },
        }
    },
    computed: {
        modelName() {
            return this.$route.params.modelName || localStorage.getItem('addModifModelName')
        },
        modelPreview() {
            return this.$route.params.modelPreview || localStorage.getItem('addModifModelPreview')
        },
        modelId() {
            return this.$route.params.id || localStorage.getItem('addModifModelId')
        }
    },
    created() {
        localStorage.setItem('addModifModelName', this.modelName)
        localStorage.setItem('addModifModelPreview', this.modelPreview)
        localStorage.setItem('addModifModelId', this.modelId)
        this.setDefaultValues()
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
            this.newModificationName = ''
            this.isNameInputShown = false
            this.isSubmitShown = false
            document.querySelectorAll('input[type=file]').forEach(it => {
                it.value = ""
            })
        },
        clickFileUpload(id) {
            this.$refs[id].click()
        },
        addModif() {

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
</style>